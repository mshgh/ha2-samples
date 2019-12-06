import { h, app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { ShowState } from './components/show-state.js'
import Counter from './modules/counter/index.js'
import PositiveCounter from './modules/positive-counter/index.js'

const modules = [
  Counter('a', { name: 'A' }),
  Counter('b', { name: 'B', count: 3 }),
  PositiveCounter('c', { name: 'C', count: 5, positive: false })
]

const Page = (state, [[{ actions: a }, aViews], [{ actions: b }, bViews], [{ actions: c }, cViews]]) => h('body', {},
  aViews.IncDec({ title: 'Counter A', incrementOther: b.increment, decrementOther: b.decrement }),
  bViews.IncDec({ title: 'Counter B', incrementOther: c.increment, decrementOther: c.decrement }),
  cViews.IncDec({ title: 'Counter C', incrementOther: a.increment, decrementOther: a.decrement }),
  h('hr'),
  cViews.Settings(),
  h('hr'),
  ShowState({ state, indent: 3 })
)

app({
  init: modules.reduce((init, m) => ({ ...init, ...m.init }), {}),
  view: state => Page(state, [...modules.map(m => [m, m.views(state)])]),
  node: document.body
})
