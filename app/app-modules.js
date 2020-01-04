import { ns } from '../lib/modules.js'
import Counter from './modules/counter/index.js'
import PositiveCounter from './modules/positive-counter/index.js'
import MultiCounter from './modules/multi-counter/index.js'

function addModule(Module, slice, props, ns) {

  const module = ns === undefined ? Module(slice, props) : ns.add(Module, slice, props)
  if (ns === undefined) topLevel.push(module)
  all.push({ slice, module })
}

const all = []
const topLevel = [ns('foo')]
const [foo] = topLevel

const counters = foo.add(ns, 'bar').add(ns, 'counters')
addModule(Counter, 'a', { name: 'A' })
addModule(Counter, 'b', { name: 'B', count: 3 })
addModule(PositiveCounter, 'c', { name: 'C', count: 5 })
addModule(Counter, 'd', { name: 'D', count: 7 }, counters)
addModule(PositiveCounter, 'e', { name: 'E', count: 13, positive: true }, counters)
addModule(MultiCounter, 'multiCounter', {}, counters)

export const modules = all.map(m => m.module)
export const indexes = all.reduce((acc, m, idx) => { acc[m.slice] = idx; return acc }, {})

const multiCounter = modules[indexes.multiCounter]
multiCounter.add({ name: 'First' })
multiCounter.add({ name: 'Second', count: 5, positive: false })
multiCounter.add({ name: 'Third' })
multiCounter.add({ name: 'Fourth', count: 7, positive: true })
multiCounter.del(0)

// must be evaluated only after ALL modules are created (including those added into MultiCounter)
export const init = topLevel.reduce((acc, m) => ({ ...acc, ...m.init }), {})
