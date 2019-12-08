import { ns, init as modulesInit } from './modules.js'
import Counter from './modules/counter/index.js'
import PositiveCounter from './modules/positive-counter/index.js'

const counters = ns('foo').add(ns, 'bar').add(ns, 'counters')

export const modules = [
  Counter('a', { name: 'A' }),
  Counter('b', { name: 'B', count: 3 }),
  PositiveCounter('c', { name: 'C', count: 5, positive: false }),
  counters.add(Counter, 'd', { name: 'D', count: 7 }),
  counters.add(PositiveCounter, 'e', { name: 'E', count: 13, positive: true }),
]

// to have valid 'modulesInit' it must be evaluated only after all modules are created 
export const init = {
  ...modulesInit,
  title: 'Counter + PositiveCoutner + Namespace'
}
