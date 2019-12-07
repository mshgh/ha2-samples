import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { ShowState } from './components/show-state.js'

export const Page = ([aActions, bActions, cActions, dActions, eActions], views) =>
  state => (([aViews, bViews, cViews, dViews, eViews]) =>
    h('body', {},
      aViews.IncDec({ title: 'Counter A', incrementOther: bActions.increment, decrementOther: bActions.decrement }),
      bViews.IncDec({ title: 'Counter B', incrementOther: cActions.increment, decrementOther: cActions.decrement }),
      cViews.IncDec({ title: 'Counter C', incrementOther: dActions.increment, decrementOther: dActions.decrement }),
      dViews.IncDec({ title: 'Counter D', incrementOther: eActions.increment, decrementOther: eActions.decrement }),
      eViews.IncDec({ title: 'Counter E', incrementOther: aActions.increment, decrementOther: aActions.decrement }),
      h('hr'),
      cViews.Settings(),
      eViews.Settings(),
      h('hr'),
      ShowState({ state, indent: 3 })
    )
  )(views.map(v => v(state)))
