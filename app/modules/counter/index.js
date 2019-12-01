import module from '../../module.js'
import actions from './counter-actions.js'
import { IncDec } from './counter-views.js'

export default (slice, { name, count = 0 }, parent) => {

  const map = module(slice, parent)
  const { 0: { increment, decrement } } = map.actions(actions)

  return {
    init: map.init(count),
    actions: {
      increment,
      decrement,
    },
    views: map.views(count => ({
      IncDec: ({ incrementOther, decrementOther }) => IncDec({ name, count, increment, decrement, incrementOther, decrementOther }),
    })),
  }
}
