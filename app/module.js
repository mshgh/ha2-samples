import map from 'https://unpkg.com/hyperapp-map@1.1.0/src/index.js'

function mapActions(mapAction, actions) {
  return actions && Object.keys(actions).reduce(function reduceActions(acc, k) {
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

function mapSlice(slice, intercept, parent) {
  const { extract, merge } = extractAndMerge(slice, intercept)
  
  return {
    init: (init, state = {}) => (!parent ? init : parent.extract(init))[slice] = state,
    extract: !parent ? extract : state => extract(parent.extract(state)),
    mapAction: !parent ? map(extract, merge) : op => parent.mapAction(map(extract, merge)(op))
  }
}

function mapModule(init, data, sliceMap) {
  const actions = mapActions(sliceMap.mapAction, data.actions)

  sliceMap.init(init, data.init)
  return [
    {
      init,
      actions,
      views: state => data.views(sliceMap.extract(state), actions)
    },
    slice => data => mapModule(init, data, mapSlice(slice, data.intercept, sliceMap))
  ]
}

export default (module, data = {}) => typeof module === 'string' ? mapModule({}, data, mapSlice(module, data.intercept)) : module(data)
