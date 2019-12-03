import { h, app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { ShowState } from './components/show-state.js'
import Counter from './modules/counter/index.js'
import PositiveCounter from './modules/positive-counter/index.js'

const counterA = Counter('A', { name: 'A' })
const counterB = Counter('B', { name: 'B', count: 3 })
const counterC = PositiveCounter('C', { name: 'C', count: 5, positive: true })

app({
  init: {
    ...counterA.init,
    ...counterB.init,
    ...counterC.init,
  },
  view: state => {
    const viewsCounterA = counterA.views(state)
    const viewsCounterB = counterB.views(state)
    const viewsCounterC = counterC.views(state)

    return h('body', {}, [
      h(viewsCounterA.IncDec, { title: 'Counter A', incrementOther: counterB.actions.increment, decrementOther: counterB.actions.decrement }),
      h(viewsCounterB.IncDec, { title: 'Counter B', incrementOther: counterC.actions.increment, decrementOther: counterC.actions.decrement }),
      h(viewsCounterC.IncDec, { title: 'Counter C', incrementOther: counterA.actions.increment, decrementOther: counterA.actions.decrement }),
      h('hr'),
      h(viewsCounterC.Settings),
      h('hr'),
      h(ShowState, { state, indent: 3 })
    ])
  },
  node: document.getElementById('app')
})
