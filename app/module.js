import map from 'https://unpkg.com/hyperapp-map@1.1.0/src/index.js'

const module = (slice, intercept, parent) => {

  const extract = state => state[slice]
  const merge = !intercept ? ((state, sub) => ({ ...state, [slice]: sub })) : ((state, sub) => ({ ...state, [slice]: intercept(sub) }))
  const mapAction = !parent ? map(extract, merge) : op => parent(map(extract, merge)(op))
  const mapObject = actions => Object.keys(actions).reduce((acc, key) => { acc[key] = mapAction(actions[key]); return acc }, {})

  return {
    init: (init = {}) => merge({}, init),
    actions: (...args) => args.map(action => typeof action === 'function' ? mapAction(action) : mapObject(action)),
    views: views => state => views(extract(state)),
    module: (slice, intercept) => module(slice, intercept, mapAction),
  }
}

export default (slice, parent, intercept) => !parent ? module(slice, intercept) : parent.module(slice, intercept)
