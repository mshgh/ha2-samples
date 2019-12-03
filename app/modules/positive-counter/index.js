import module from '../../module.js'
import * as actions from './positive-counter-actions.js'
import { Settings } from './positive-counter-components.js'
import Counter from '../counter/index.js'

export default (slice, { name, count = 0, positive = false }, parent) => {

  const map = module(slice, parent, state => !state.positive ? state : { ...state, counter: Math.max(0, state.counter) })
  const { 0: { toggle } } = map.actions(actions)
  const counter = Counter('counter', { name: name && (name + ' (positive)'), count }, map)

  return {
    init: map.init({ positive, ...counter.init }),
    actions: counter.actions,
    views: map.views(state => ({
      Settings: () => Settings({ name, checked: !state.positive, toggle }),
      ...counter.views(state),
    })),
  }
}
