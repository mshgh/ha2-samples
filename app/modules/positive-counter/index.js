import module from '../../module.js'
import * as actions from './positive-counter-actions.js'
import { Settings } from './positive-counter-components.js'
import Counter from '../counter/index.js'

const counter = (child, name, count) => Counter(child('counter'), { name: name && (name + ' (positive)'), count })

export default (slice, { name, count = 0, positive = false }) => (([{ init, views }, child], { actions, views: counterViews } = counter(child, name, count)) => ({
  init,
  actions,
  views: state => ({
    ...views(state),
    ...counterViews(state)
  })
}))(module(slice, {
  init: { positive },
  actions,
  views: (state, { toggle }) => ({
    Settings: () => Settings({ name, checked: !state.positive, toggle })
  }),
  intercept: state => !state.positive ? state : { ...state, counter: Math.max(0, state.counter) }
}))

/*
 * this is identical code as the one above only not so condensed to be easy understand
 *
export default (slice, { name, count = 0, positive = false }) => {

  const [positiveCounter, child] = module(slice, {
    init: { positive },
    actions,
    views: (state, { toggle }) => ({
      Settings: () => Settings({ name, checked: !state.positive, toggle })
    }),
    intercept: state => !state.positive ? state : { ...state, counter: Math.max(0, state.counter) }
  })
  const counter = Counter(child('counter'), { name: name && (name + ' (positive)'), count })

  return {
    init: positiveCounter.init,
    actions: counter.actions,
    views: state => ({
      ...positiveCounter.views(state),
      ...counter.views(state)
    })
  }
}
*/