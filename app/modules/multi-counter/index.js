import { ar } from '../../../lib/modules.js'
import Counter from '../counter/index.js'
import PositiveCounter from '../positive-counter/index.js'
import { WithDeleteButton } from './multi-counter-components.js'

export default function MultiCounter(slice, { } = {}) {
  const { init, actions, all, add, del } = ar(slice, function getCounter(props) {
    return isPositiveCounter(props) ? PositiveCounter : Counter
  })

  return {
    init, actions, add, del,
    views(state) {
      return {
        Counters() {
          const counters = all().map(c => ({ actions: c.actions, views: c.views(state) }))

          return counters.map((a, idx) => WithDeleteButton({
            Module: a.views.IncDec({
              incrementOther: counters[wrapIndex(idx + 1)].actions.increment,
              decrementOther: counters[wrapIndex(idx + 1)].actions.decrement
            }),
            onDelete: [actions.del, idx]
          }))

          function wrapIndex(index) {
            return index < 0 ? counters.length - 1 : index >= counters.length ? 0 : index
          }
        },
        Settings() {
          return all(isPositiveCounter).map(c => c.views(state).Settings())
        }
      }
    }
  }

  function isPositiveCounter({ positive }) {
    return positive !== undefined
  }
}
