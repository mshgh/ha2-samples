export const haBuild = (operations, { focus, namespace } = {}) => {
  let mainView, currentState
  const focuses = [], ROOT_NS = 'root', namespaces = [{ key: ROOT_NS, views: { [ROOT_NS]: {} }, actions: { [ROOT_NS]: {} } }]

  const isA = a => Array.isArray(a), isF = f => typeof f === 'function', isO = o => o?.constructor === Object
  const getIndirectKey = (focus, props) => {
    const key = props.reduce((key, props) => typeof key === 'undefined' ? props?.[focus] : key, undefined)
    if (typeof key === 'undefined') throw new Error(`Property '${focus}' not found in props`)
    return key
  }
  const getKey = (focus, ...props) => focus[0] === '@' ? getIndirectKey(focus.slice(1), props) : focus
  const getName = (fnName, name) => typeof name === 'undefined' ? fnName : name
  const setCurrent = (stack, name, value, key = namespaces[0].key) => !name ? stack[key] = value : stack[key][name] = value
  const deepClone = obj => Object.entries(obj).reduce((acc, [k, v]) => (acc[k] = isO(v) ? deepClone(v) : v, acc), {})

  const captureViewProps = Symbol()
  const focusAction = (action, { curriedDi, di } = {}) => {
    const focus = [...focuses], inject = di && deepClone(di(namespaces[0].actions[namespaces[0].key]))
    if (curriedDi) action = action(inject)
    return (state, props) => {
      let viewProps
      const focusedAction = (state, props) => {
        if (inject && !curriedDi && !isO(props)) throw new Error(`Cannot inject dependencies into scalar props`)
        const subStates = focus.reduce((acc, focus) => {
          acc.unshift(!acc.length ? [state || {}, focus] : [acc[0][0][acc[0][1]] || {}, getKey(focus, props, viewProps)])
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
      return state === captureViewProps ? (viewProps = props, focusedAction) : focusedAction(state, props)
    }
  }

  const focusView = (view, { di, subState } = {}) => {
    const focus = [...focuses], [views, actions] = ['views', 'actions'].map(stack => di && deepClone(namespaces[0][stack][namespaces[0].key]))
    return (props, children) => {
      const setViewProps = (obj, callback = (acc, [key, value]) => (acc[key] = setViewProps(value), acc)) =>
        typeof obj === 'function' ? obj(captureViewProps, props) : Object.entries(obj).reduce(callback, {})
      const inject = di && di({ views, actions: actions && setViewProps(actions) })
      const state = focus.reduce((acc, focus) => acc?.[getKey(focus, props)], currentState)
      return view(!subState ? state : subState(state), inject ? { ...inject, ...props } : props, children)
    }
  }

  const focuser = (stack, focus, fn, { name, ...props } = {}) => setCurrent(stack, getName(fn.name, name), focus(fn, props))
  const handlers = {
    Action: (action, props) => focuser(namespaces[0].actions, focusAction, action, props),
    Actions: (actions, { name, ...props } = {}) => actions.forEach(action => handlers.Action(action, props)),
    View: (view, props) => focuser(namespaces[0].views, focusView, view, props),
    MainView: (view, props, viewProps) => mainView = [focusView(view, props), viewProps],
    Scope: ({ namespace, focus }, ops) => processOperation(handlers.Include, { focus, namespace }, ops),
    Include: ops => ops.forEach(([op, ...args]) => typeof op === 'string' && processOperation(handlers[op] || op, args?.[1], ...args))
  }

  const pushNamespace = namespace => {
    const { key, actions, views } = namespaces[0]
    for (const stack of [actions, views]) stack[key][namespace] || setCurrent(stack, namespace, {})
    namespaces.unshift({ key: namespace, views: views[key], actions: actions[key] })
  }

  const processOperation = (handler, { focus, namespace } = {}, ...args) => {
    if (!isF(handler)) throw new Error(`Unrecognized operation: ${handler}`)
    if (namespace) isA(namespace) ? namespace.map(pushNamespace) : pushNamespace(namespace)
    if (focus) isA(focus) ? focuses.push(...focus) : focuses.push(focus)
    handler(...args)
    if (namespace) namespaces.splice(0, isA(namespace) ? namespace.length : 1)
    if (focus) focuses.splice(0, isA(focus) ? focus.length : 1)
  }

  processOperation(handlers.Include, { focus, namespace }, operations)
  if (!isF(mainView?.[0])) throw new Error(`The main view is not defined, please use 'MainView' to define it`)
  return {
    view: state => (currentState = state, mainView[0](mainView[1])),
    actions: namespaces.at(-1).actions[namespaces.at(-1).key]
  }
}
