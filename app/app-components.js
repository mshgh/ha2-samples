import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { ShowState } from './components/show-state.js'

export const Page = ({ state, title, actions: [a, b, c, d, e], views: [aViews, bViews, cViews, dViews, eViews] }) => h('body', { style: { 'font-family': 'sans-serif' } },
  h('h2', {}, title),
  aViews.IncDec({ title: 'Counter A', incrementOther: b.increment, decrementOther: b.decrement }),
  bViews.IncDec({ title: 'Counter B', incrementOther: c.increment, decrementOther: c.decrement }),
  cViews.IncDec({ title: 'Counter C', incrementOther: d.increment, decrementOther: d.decrement }),
  dViews.IncDec({ title: 'Counter D', incrementOther: e.increment, decrementOther: e.decrement }),
  eViews.IncDec({ title: 'Counter E', incrementOther: a.increment, decrementOther: a.decrement }),
  h('hr'),
  cViews.Settings(),
  eViews.Settings(),
  h('hr'),
  ShowState({ state, indent: 3 })
)
