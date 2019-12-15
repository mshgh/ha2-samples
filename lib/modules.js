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
        return data.views(sliceMap.extract(state), actions)
      }
    },
    function child(slice) {
      return function module(data = {}) {
        return mapModule(childInit, data, mapSlice(slice, data.intercept, sliceMap))
      }
    }
  ]
}

export const init = {}

export function module(slice, data = {}) {
  return typeof slice !== 'string' ? slice(data)
    : mapModule(init, data, mapSlice(slice, data.intercept))
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
