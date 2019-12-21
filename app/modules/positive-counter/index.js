import { module } from '../../../lib/modules.js'
import * as actions from './positive-counter-actions.js'
import { Settings } from './positive-counter-components.js'
import Counter from '../counter/index.js'

export default function PositiveCounter(slice, { name, count = 0, positive = false } = {}) {

  const [{ init, views }, child] = module(slice, {
    init: {
      positive
    },
    actions,
    views({ slice, actions: { toggle } }) {
      return {
        Settings() {
          return Settings({ name, checked: !slice.positive, toggle })
        }
      }
    },
    intercept(state) {
      return !state.positive ? state : { ...state, counter: Math.max(0, state.counter) }
    }
  })

  const counter = Counter(child('counter'), { name: name && (name + ' (positive)'), count })

  return {
    init,
    actions: counter.actions,
    views(state) {
      return {
        ...views(state),
        ...counter.views(state)
      }
    }
  }
}
