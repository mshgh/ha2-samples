import map from 'https://unpkg.com/hyperapp-map@1.1.0/src/index.js'

function _module(name, data = {}, init = {}, parent) {
  if (typeof name !== 'string') return name(data)

  const { intercept, init: dataInit = {}, view } = data
  const extract = getExtract(), mapAction = getMapAction()
  const actions = data.actions && Object.keys(data.actions).reduce(mapActions, {})

  init[name] = dataInit
  return {
    name,
    init,
    actions,
    view(state, props) {
      return view({ slice: extract(state), actions, state }, props)
    },
    subModule(Module, name, props) {
      return Module(function module(data) {
        return _module(name, data, dataInit, { extract, mapAction })
      }, props)
    }
  }

  function getExtract() {
    if (parent === undefined) return _extract

    return function _extractParent(state) {
      return _extract(parent.extract(state))
    }
  }

  function getMapAction() {
    if (parent === undefined) return map(_extract, intercept === undefined ? _merge : _mergeIntercept)

    if (intercept === undefined) return function _mapAction(op) {
      return parent.mapAction(map(_extract, _merge)(op))
    }

    return function _mapActionParent(op) {
      return parent.mapAction(map(_extract, _mergeIntercept)(op))
    }
  }

  function mapActions(acc, k) {
    acc[k] = mapAction(data.actions[k])
    return acc
  }

  function _extract(state) { return state[name] }
  function _merge(state, slice) { return { ...state, [name]: slice } }
  function _mergeIntercept(state, slice) { return { ...state, [name]: intercept(slice) } }
}

export function module(slice, data) {
  const { init, actions, view, subModule } = _module(slice, data)
  return { init, actions, view, subModule }
}

export function ns(slice) {
  const { init, subModule: add } = _module(slice)
  return { init, add }
}

export function ar(slice, getModule) {
  const modules = []
  const { name, init, actions, subModule } = _module(slice, {
    init: { seq: -1, order: [] },
    actions: { add, del }
  })

  return {
    init,
    actions,
    count() {
      return modules.length
    },
    all(filter) {
      return filter === undefined
        ? modules.map(m => m.instance)
        : modules.filter(m => filter(m.props)).map(m => m.instance)
    },
    add(props) {
      updateInit(add, props)
    },
    del(idx) {
      updateInit(del, idx)
    }
  }

  function add(slice, props) {
    const seq = slice.seq + 1
    const id = `m${seq}`
    const instance = subModule(getModule(props), id, props)

    modules.push({ props, instance })

    return {
      ...slice,
      seq,
      order: [...slice.order, { id, props }],
      [id]: instance.init[id]
    }
  }

  function del(slice, idx) {
    const { [slice.order[idx].id]: _, ...result } = slice

    modules.splice(idx, 1)

    return {
      ...result,
      order: slice.order.filter((_, i) => idx !== i)
    }
  }

  function updateInit(action, props) {
    const slice = init[name]
    const { seq, order } = action(slice, props)

    if (action === del) {
      delete slice[slice.order[props].id]
    }
    slice.seq = seq
    slice.order = order
  }
}
