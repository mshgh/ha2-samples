import map from 'https://unpkg.com/hyperapp-map@1.1.0/src/index.js'

function mapActions(mapAction, actions) {
  return actions && Object.keys(actions).reduce(function reduceActions(acc, k) {
    acc[k] = mapAction(actions[k])
    return acc
  }, {})
}

function extractAndMerge(name, intercept) {
  return {
    extract(state) {
      return state[name]
    },
    merge: !intercept
      ? function merge(state, sub) {
        return { ...state, [name]: sub }
      }
      : function merge(state, sub) {
        return { ...state, [name]: intercept(sub) }
      }
  }
}

function mapSlice(name, intercept, parent) {
  const { extract, merge } = extractAndMerge(name, intercept)

  return {
    init(init, childInit = {}) {
      return init[name] = childInit
    },
    extract: !parent ? extract : state => extract(parent.extract(state)),
    mapAction: !parent ? map(extract, merge) : op => parent.mapAction(map(extract, merge)(op))
  }
}

function mapModule(name, init, data, sliceMap, topLevelInit = init) {
  const actions = mapActions(sliceMap.mapAction, data.actions)
  const childInit = sliceMap.init(init, data.init)

  return {
    name,
    topLevelInit,
    init,
    actions,
    view(state, props) {
      return data.view({ slice: sliceMap.extract(state), actions, state }, props)
    },
    subModule(Module, name, props) {
      return Module(function module(data = {}) {
        return mapModule(name, childInit, data, mapSlice(name, data.intercept, sliceMap), topLevelInit)
      }, props)
    }
  }
}

function _module(slice, data) {
  return typeof slice !== 'string' ? slice(data)
    : mapModule(slice, {}, data, mapSlice(slice, data.intercept))
}

export function module(slice, data = {}) {
  const { init, actions, view, subModule } = _module(slice, data)
  return { init, actions, view, subModule }
}

export function ns(slice) {
  const { init, subModule: add } = module(slice)

  return { init, add }
}

export function ar(slice, getModule) {
  const modules = []
  const { init, topLevelInit, actions: { updateInit, ...actions }, subModule } = _module(slice, {
    init: {
      seq: -1,
      order: []
    },
    actions: {
      add,
      del,
      updateInit(slice, { action, props }) {
        const { seq, order } = action(slice, props)

        if (action === del) {
          delete slice[slice.order[props].id]
        }
        slice.seq = seq
        slice.order = order
      }
    }
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
      updateInit(topLevelInit, { action: add, props })
    },
    del(idx) {
      updateInit(topLevelInit, { action: del, props: idx })
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
}
