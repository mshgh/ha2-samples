import { module } from '../../../lib/modules.js'
import * as actions from './counter-actions.js'
import { IncDec } from './counter-components.js'

export default function Counter(slice, { name, count = 0 } = {}) {
  const { init, view, ...counter } = module(slice, {
    init: count,
    actions,
    view({ slice, actions: { increment, decrement } }) {
      return {
        IncDec({ name: forceName, incrementOther, incrementOtherLabel, decrementOther, decrementOtherLabel } = {}) {
          return IncDec({ name: (forceName || name), count: slice, increment, decrement, incrementOther, incrementOtherLabel, decrementOther, decrementOtherLabel })
        }
      }
    }
  })

  return {
    init,
    actions: counter.actions,
    view
  }
}
