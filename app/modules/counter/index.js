import { module } from '../../../lib/modules.js'
import * as actions from './counter-actions.js'
import { IncDec } from './counter-components.js'

export default (slice, { name, count = 0 } = {}) => (([counter]) => counter)(module(slice, {
  init: count,
  actions,
  views: (count, { increment, decrement }) => ({
    IncDec: ({ incrementOther, decrementOther } = {}) => IncDec({ name, count, increment, decrement, incrementOther, decrementOther })
  })
}))

/*
 * this is identical code as the one above only not so condensed to be easy understand
 *
export default (slice, { name, count = 0 } = {}) => {

  const [counter] = module(slice, {
    init: count,
    actions,
    views: (count, { increment, decrement }) => ({
      IncDec: ({ incrementOther, decrementOther }) => IncDec({ name, count, increment, decrement, incrementOther, decrementOther })
    })
  })

  return {
    init: counter.init,
    actions: counter.actions,
    views: counter.views
  }
}
*/
