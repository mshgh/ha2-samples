import map from 'https://unpkg.com/hyperapp-map@1.1.0/src/index.js'

function mapActions(mapAction, actions) {
  return actions && Object.keys(actions).reduce(function reduceActions(acc, k) {
    acc[k] = mapAction(actions[k])
    return acc
  }, {})
}

function extractAndMerge(slice, intercept) {
  return {
    extract(state) {
      return state[slice]
    },
    merge: !intercept
      ? function merge(state, sub) {
        return { ...state, [slice]: sub }
      }
      : function merge(state, sub) {
        return { ...state, [slice]: intercept(sub) }
      }
  }
}

function mapSlice(slice, intercept, parent) {
  const { extract, merge } = extractAndMerge(slice, intercept)

  return {
    init(init, childInit = {}) {
      return init[slice] = childInit
    },
    extract: !parent ? extract : state => extract(parent.extract(state)),
    mapAction: !parent ? map(extract, merge) : op => parent.mapAction(map(extract, merge)(op))
  }
}

function mapModule(init, data, sliceMap) {
  const actions = mapActions(sliceMap.mapAction, data.actions)
  const childInit = sliceMap.init(init, data.init)

  return [
    {
      init,
      actions,
      views(state) {
        return data.views({ slice: sliceMap.extract(state), actions, state })
      }
    },
    function child(slice) {
      return function module(data = {}) {
        return mapModule(childInit, data, mapSlice(slice, data.intercept, sliceMap))
      }
    }
  ]
}

export function module(slice, data = {}) {
  return typeof slice !== 'string' ? slice(data)
    : mapModule({}, data, mapSlice(slice, data.intercept))
}

export function ns(slice) {
  const [{ init }, child] = module(slice)

  return {
    init,
    add(Module, slice, props) {
      return Module(child(slice), props)
    }
  }
}

export function ar(slice, getModule) {
  const modules = []
  const [
    { init, actions: { mutate, ...actions } },
    child
  ] = module(slice, {
    init: {
      seq: -1,
      order: []
    },
    actions: {
      add,
      del,
      mutate(slice, { action, props }) {
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
      mutate(init, { action: add, props })
    },
    del(idx) {
      mutate(init, { action: del, props: idx })
    }
  }

  function add(slice, props) {
    const seq = slice.seq + 1
    const id = `m${seq}`
    const instance = getModule(props)(child(id), props)

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
