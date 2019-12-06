import map from 'https://unpkg.com/hyperapp-map@1.1.0/src/index.js'

function mapActions(mapAction, actions) {
  return Object.keys(actions).reduce(function reduceActions(acc, k) {
    acc[k] = mapAction(actions[k])
    return acc
  }, {})
}

function extractAndMerge(slice, intercept) {
  return {
    extract: function extract(state) {
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

function mapSlice(slice, intercept, parent, init = {}, { extract, merge } = extractAndMerge(slice, intercept)) {
  return {
    init: function mapInit(state) {
      init[slice] = state
      return init
    },
    extract: !parent ? extract : state => extract(parent.extract(state)),
    mapAction: !parent ? map(extract, merge) : op => parent.mapAction(map(extract, merge)(op))
  }
}

function mapModule(data, sliceMap, init = sliceMap.init(data.init), actions = mapActions(sliceMap.mapAction, data.actions)) {
  return [
    {
      init,
      actions,
      views: state => data.views(sliceMap.extract(state), actions)
    },
    slice => data => mapModule(data, mapSlice(slice, data.intercept, sliceMap, sliceMap.extract(init)))
  ]
}

export default (module, data) => typeof module === 'string' ? mapModule(data, mapSlice(module, data.intercept)) : module(data)
