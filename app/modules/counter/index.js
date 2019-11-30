import actions from './counter-actions.js'
import { IncDec } from './counter-views.js'

export default map => {
  const { 0:{ increment, decrement } } = map.operations(actions)
  
  return {
    init: (count = 0) => map.init(count),
    increment,
    decrement,
    views: map.views(count => ({
      IncDec: ({ title, incrementOther, decrementOther }) => IncDec({ title, count, increment, decrement, incrementOther, decrementOther }),
    })),
  }
}
