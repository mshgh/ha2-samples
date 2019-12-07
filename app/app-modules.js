import Namespace from './modules/namespace.js'
import Counter from './modules/counter/index.js'
import PositiveCounter from './modules/positive-counter/index.js'

const counters = Namespace('foo').add(Namespace, 'bar').add(Namespace, 'counters')
export const modules = [
  Counter('a', { name: 'A' }),
  Counter('b', { name: 'B', count: 3 }),
  PositiveCounter('c', { name: 'C', count: 5, positive: false }),
  counters.add(Counter, 'd', { name: 'D', count: 7 }),
  counters.add(PositiveCounter, 'e', { name: 'E', count: 13, positive: true }),
]
