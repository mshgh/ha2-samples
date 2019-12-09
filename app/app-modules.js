import { ns } from '../lib/modules.js'
import Counter from './modules/counter/index.js'
import PositiveCounter from './modules/positive-counter/index.js'

const all = []
const addModule = (Module, slice, props, ns = { add: (Module, slice, props) => Module(slice, props) }) => all.push({ slice, module: ns.add(Module, slice, props) })

const counters = ns('foo').add(ns, 'bar').add(ns, 'counters')
addModule(Counter, 'a', { name: 'A' })
addModule(Counter, 'b', { name: 'B', count: 3 })
addModule(PositiveCounter, 'c', { name: 'C', count: 5 })
addModule(Counter, 'd', { name: 'D', count: 7 }, counters)
addModule(PositiveCounter, 'e', { name: 'E', count: 13, positive: true }, counters)

export const modules = all.map(m => m.module)
export const indexes = all.reduce((acc, m, idx) => { acc[m.slice] = idx; return acc }, {})
