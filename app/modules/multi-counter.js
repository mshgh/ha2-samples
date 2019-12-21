import { module, ns } from '../../lib/modules.js'
import Counter from './counter/index.js'
import PositiveCounter from './positive-counter/index.js'

export default function MultiCounter(slice, { } = {}) {

  const counters = []
  let seq = -1

  const [multiCounter, child] = module(slice, {
    views(slice) {
      return function (state) {

        function positiveCounter(module) {
          return slice[module.id].type === 'positiveCounter'
        }

        function views(filter = _ => true) {
          return counters.filter(filter).map(c => c.module.views(state))
        }

        return {
          Counters() { return views().map(v => v.IncDec()) },
          Settings() { return views(positiveCounter).map(v => v.Settings()) }
        }
      }
    }
  })

  function add({ name, count, positive }) {
    const id = `m${++seq}`
    const module = positive === undefined
      ? ns(child(id)).add(Counter, 'module', { name, count })
      : ns(child(id)).add(PositiveCounter, 'module', { name, count, positive })

    module.init.type = positive === undefined ? 'counter' : 'positiveCounter'
    module.init.props = arguments[0]
    counters.push({ id, module })
  }

  return {
    init: multiCounter.init,
    actions: multiCounter.actions,
    views(state) {
      return multiCounter.views(state)(state)
    },
    add
  }
}
