import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { ShowState } from './components/show-state.js'
import { indexes as module } from './app-modules.js'

export const Page = ({
  state, title,
  actions: { [module.a]: a, [module.b]: b, [module.c]: c, [module.d]: d, [module.e]: e },
  views: { [module.a]: aViews, [module.b]: bViews, [module.c]: cViews, [module.d]: dViews, [module.e]: eViews }
}) =>
  h('body', { style: { 'font-family': 'sans-serif' } },
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
