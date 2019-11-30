import map from 'https://unpkg.com/hyperapp-map@1.1.0/src/index.js'

const mapOperation = map => operation => typeof operation === 'function' ? map(operation)
  : Object.keys(operation).reduce((acc, key) => { acc[key] = map(operation[key]); return acc }, {})

export default (module, extract, merge) => (map => module({
  init: (init = {}) => merge({}, init),
  operations: (...args) => args.map(mapOperation(map)),
  views: views => state => views(extract(state)),
}))(map(extract, merge))
