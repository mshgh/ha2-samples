import { ar } from '../../../lib/modules.js'
import Counter from '../counter/index.js'
import PositiveCounter from '../positive-counter/index.js'
import { Counters, Settings } from './multi-counter-components.js'

export default function MultiCounter(slice, { } = {}) {
  const { init, actions, all, add, del } = ar(slice, function getCounter(props) {
    return isPositiveCounter(props) ? PositiveCounter : Counter
  })

  return {
    init, actions, add, del,
    view(state) {
      return {
        Counters() {
          return Counters({
            counters: all().map(c => ({
              IncDec: c.view(state).IncDec,
              increment: c.actions.increment,
              decrement: c.actions.decrement
            })),
            del: actions.del
          })
        },
        Settings() {
          return Settings({
            counters: all(isPositiveCounter).map(c => ({
              Settings: c.view(state).Settings
            }))
          })
        }
      }
    }
  }

  function isPositiveCounter({ positive }) {
    return positive !== undefined
  }
}
