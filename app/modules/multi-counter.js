import { module } from '../../lib/modules.js'
import Counter from './counter/index.js'
import PositiveCounter from './positive-counter/index.js'

export default function MultiCounter(slice, { } = {}) {

  const counters = []
  const init = []

  const [multiCounter] = module(slice, {
    init,
    views: state => ({
      Counters: () => state.map((c, idx) => counters[idx].views(c).IncDec()),
      Settings: () => state.map((c, idx) => counters[idx].views(c)).filter(v => v.Settings !== undefined).map(v => v.Settings())
    })
  })

  function add({ name, count, positive }) {
    const counter = positive === undefined
      ? Counter('counter', { name, count })
      : PositiveCounter('positiveCounter', { name, count, positive })

    counters.push(counter)
    init.push(counter.init)
  }

  return {
    init: multiCounter.init,
    views: multiCounter.views,
    add
  }
}
