export const build = (operations, { focus, namespace, buildDi } = {}) => {
  let mainView, currentState
  const focuses = [], ROOT_NS = 'root', namespaces = [ROOT_NS], views = [{ [ROOT_NS]: {} }], actions = [{ [ROOT_NS]: {} }]

  const isA = a => Array.isArray(a), isF = f => typeof f === 'function'
  const getPropsKey = (focus, props) => {
    const key = props.reduce((key, props) => !key ? props?.[focus] : key, undefined)
    if (typeof key === 'undefined') throw new Error(`Key ${focus} not found in props`)
    return key
  }
  const getKey = (focus, ...props) => focus[0] === '@' ? getPropsKey(focus.slice(1), props) : focus
  const getName = (fnName, name) => typeof name === 'undefined' ? fnName : name
  const setCurrent = (stack, name, value) => !name ? stack[0][namespaces[0]] = value : stack[0][namespaces[0]][name] = value
  const pushViewsActions = name => {
    [views, actions].forEach(stack => {
      if (!stack[0][namespaces[0]][name]) setCurrent(stack, name, {})
      stack.unshift(stack[0][namespaces[0]])
    })
    namespaces.unshift(name)
  }
  const popStacks = (count, keep, ...stacks) => stacks.forEach(stack => {
    if (count > (stack.length - keep)) throw new Error(`Cannot pop '${count}' item(s) from stack with depth '${stack.length} and keep '${keep}' item(s)`)
    stack.splice(0, count)
  })

  const focusAction = (actionFocus, action, { curriedDi, di } = {}) => {
    const inject = di && di(actions[0][namespaces[0]])
    if (curriedDi) action = action(inject)
    return (state, props) => {
      if (inject && !curriedDi && props?.constructor !== Object) throw new Error(`Cannot inject dependencies into scalar props`)
      const subStates = actionFocus.reduce((acc, focus) => {
        acc.unshift(!acc.length ? [state || {}, focus] : [acc[0][0][acc[0][1]] || (focus[0] === '@' ? [] : {}), getKey(focus, props)])
        return acc
      }, [])
      const subState = !subStates.length ? state : subStates[0][0][subStates[0][1]]
      const result = action(subState, inject && !curriedDi ? { ...inject, ...props } : props)
      const newSubState = isA(result) ? result[0] : result
      if (isF(newSubState)) return result
      const newState = newSubState === subState ? state : subStates.reduce((newState, [parent, key]) => {
        return !isA(parent) ? { ...parent, [key]: newState }
          : parent.map((item, index) => index === key ? newState : item) // TODO: is there better way how to update array element?
      }, newSubState)
      return isA(result) ? (result[0] = newState, result) : newState
    }
  }

  const focusView = (viewFocus, view, { curriedDi, di, subState } = {}) => {
    const inject = di && di({ ...buildDi, views: views[0][namespaces[0]], actions: actions[0][namespaces[0]] })
    if (curriedDi) view = view(inject)
    return (props, children) => {
      const state = viewFocus.reduce((acc, focus) => acc?.[getKey(focus, props)], currentState)
      return view(!subState ? state : subState(state), inject && !curriedDi ? { ...inject, ...props } : props, children)
    }
  }

  const handlers = {
    Action: (action, { name, ...props } = {}) => setCurrent(actions, getName(action.name, name), focusAction([...focuses], action, props)),
    Actions: (actions, { name, ...props } = {}) => actions.forEach(action => handlers['Action'](action, props)),
    View: (view, { name, ...props } = {}) => setCurrent(views, getName(view.name, name), focusView([...focuses], view, props)),
    MainView: (view, props, viewProps) => mainView = [focusView([...focuses], view, props), viewProps],
    Push: ({ namespace, focus }, ops) => processOperation('Include', { focus, namespace }, ops),
    Include: ops => ops.forEach(([op, ...args]) => processOperation(op, args?.[1], ...args)) // 2nd argument contains Context
  }

  const processOperation = (operation, { focus, namespace } = {}, ...args) => {
    const handler = handlers[operation], popCount = push => push && (isA(push) ? push.length : 1)
    if (!isF(handler)) throw new Error(`Unrecognized operation: ${operation}`)

    if (namespace) isA(namespace) ? namespace.map(pushViewsActions) : pushViewsActions(namespace)
    if (focus) isA(focus) ? focuses.push(...focus) : focuses.push(focus)
    handler(...args)
    if (namespace) popStacks(popCount(namespace), 1, views, actions, namespaces)
    if (focus) popStacks(popCount(focus), 0, focuses)
  }

  processOperation('Include', { focus, namespace }, operations)
  if (!isF(mainView?.[0])) throw new Error(`The main view is not defined, please use 'MainView' to define it`)
  return {
    view: state => (currentState = state, mainView[0](mainView[1])),
    actions: actions.at(-1)[namespaces.at(-1)]
  }
}
