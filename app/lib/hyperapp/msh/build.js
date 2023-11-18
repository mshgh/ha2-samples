export const build = (operations, { pushFocus, pushNamespace, buildDi } = {}) => {
  let mainView, currentState
  const focuses = [], ROOT_NS = 'root', namespace = [ROOT_NS], views = [{ [ROOT_NS]: {} }], actions = [{ [ROOT_NS]: {} }]

  const getKey = (focus, props) => focus[0] === '@' ? props?.[focus.slice(1)] : focus
  const getName = (fnName, name) => typeof name === 'undefined' ? fnName : name
  const setCurrent = (stack, name, value) => !name ? stack[0][namespace[0]] = value : stack[0][namespace[0]][name] = value
  const pushViewsActions = name => {
    [views, actions].forEach(stack => {
      if (!stack[0][namespace[0]][name]) setCurrent(stack, name, {})
      stack.unshift(stack[0][namespace[0]])
    })
    namespace.unshift(name)
  }

  const focusAction = (actionFocus, action, { curriedDi, di, props: buildProps } = {}) => {
    const inject = di && di(actions[0][namespace[0]])
    if (curriedDi) action = action(inject)
    return (state, actionProps) => {
      const props = actionProps?.constructor === Object ? { ...buildProps, ...actionProps } : actionProps
      const subStates = actionFocus.reduce((acc, focus) => {
        acc.unshift(!acc.length ? [state || {}, focus] : [acc[0][0][acc[0][1]] || (focus[0] === '@' ? [] : {}), getKey(focus, props)])
        return acc
      }, [])
      const subState = !subStates.length ? state : subStates[0][0][subStates[0][1]]
      const result = action(subState, curriedDi || !inject || props === actionProps ? props : { ...inject, ...props })
      const newSubState = Array.isArray(result) ? result[0] : result
      if (typeof newSubState === 'function') return result
      const newState = newSubState === subState ? state : subStates.reduce((newState, [parent, key]) => {
        return !Array.isArray(parent) ? { ...parent, [key]: newState }
          : parent.map((item, index) => index === key ? newState : item) // TODO: is there better way how to update array element?
      }, newSubState)
      return Array.isArray(result) ? (result[0] = newState, result) : newState
    }
  }

  const focusView = (viewFocus, view, { curriedDi, di, subState = s => s, props: buildProps } = {}) => {
    const inject = di && di({ ...buildDi, views: views[0][namespace[0]], actions: actions[0][namespace[0]] })
    if (curriedDi) view = view(inject)
    return (viewProps, children) => {
      const props = { ...buildProps, ...viewProps }
      const state = viewFocus.reduce((acc, focus) => acc?.[getKey(focus, props)], currentState)
      return view(subState(state), curriedDi || !inject ? props : { ...inject, ...props }, children)
    }
  }

  const popStacks = (count, keep, ...stacks) => { // from all stacks pops 'count' elements ensuring at least 'keep' elements are kept
    if (!Number.isInteger(count) || count < 1) throw new Error(`'count' must be integer bigger then 0, but '${count}' provided`)
    if (!Number.isInteger(keep) || count < 0) throw new Error(`'keep' must be integer bigger or equeal 0, but '${keep}' provided`)
    stacks.forEach(stack => {
      if (!Array.isArray(stack)) throw new Error(`Stack operations can be performend on Array only, '${stack}' provided`)
      if (count > (stack.length - keep)) throw new Error(`Cannot pop '${count}' item(s) from stack with depth '${stack.length} and keep '${keep}' item(s)`)
      stack.splice(0, count)
    })
  }

  const handlers = {
    Context: ({ pushFocus, pushNamespace, popFocus, popNamespace }) => {
      if (popNamespace) popStacks(popNamespace, 1, views, actions, namespace)
      if (pushNamespace) Array.isArray(pushNamespace) ? pushNamespace.map(pushViewsActions) : pushViewsActions(pushNamespace)
      if (popFocus) popStacks(popFocus, 0, focuses)
      if (pushFocus) Array.isArray(pushFocus) ? focuses.push(...pushFocus) : focuses.push(pushFocus)
    },

    Action: (action, { name, ...props } = {}) => setCurrent(actions, getName(action.name, name), focusAction([...focuses], action, props)),
    Actions: (actions, { name, ...props } = {}) => actions.forEach(action => handlers['Action'](action, props)),

    View: (view, { name, ...props } = {}) => setCurrent(views, getName(view.name, name), focusView([...focuses], view, props)),
    MainView: (view, props, viewProps) => mainView = [focusView([...focuses], view, props), viewProps],

    Include: ops => ops.forEach(([op, ...args]) => processOperation(op, args?.[1], ...args)) // 2nd argument contains Context
  }

  const processOperation = (operation, { pushFocus, pushNamespace } = {}, ...args) => {
    const handler = handlers[operation]
    if (typeof handler !== 'function') throw new Error(`Unrecognized operation: ${operation}`)

    handlers['Context']({ pushFocus, pushNamespace })
    handler(...args)
    const popCount = push => push && (Array.isArray(push) ? push.length : 1)
    handlers['Context']({ popFocus: popCount(pushFocus), popNamespace: popCount(pushNamespace) })
  }

  processOperation('Include', { pushFocus, pushNamespace }, operations)
  if (typeof mainView?.[0] !== 'function') throw new Error(`The main view is not defined, please use 'MainView' to define it`)
  return {
    view: state => (currentState = state, mainView[0](mainView[1])),
    actions: actions.at(-1)[namespace.at(-1)]
  }
}
