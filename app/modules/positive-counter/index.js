import { module } from '../../../lib/modules.js'
import * as actions from './positive-counter-actions.js'
import { Settings } from './positive-counter-components.js'
import Counter from '../counter/index.js'
import { ON, OFF } from '../../components/helpers.js'

export default function PositiveCounter(slice, { name, count = 0, positive = false } = {}) {

  const [{ init, views }, child] = module(slice, {
    init: {
      positive
    },
    actions,
    views({ slice, actions: { toggle }, state }) {
      return {
        IncDec({ incrementOther, incrementOtherLabel, decrementOther, decrementOtherLabel } = {}) {
          const { IncDec } = counter.views(state)
          return IncDec({ name: [`${name} (positive `, slice.positive ? ON() : OFF(), ')'], incrementOther, incrementOtherLabel, decrementOther, decrementOtherLabel })
        },
        Settings() {
          return Settings({ name, checked: !slice.positive, toggle })
        }
      }
    },
    intercept(state) {
      return !state.positive ? state : { ...state, counter: Math.max(0, state.counter) }
    }
  })

  const counter = Counter(child('counter'), { count })

  return {
    init,
    actions: counter.actions,
    views(state) {
      return views(state)
    }
  }
}
