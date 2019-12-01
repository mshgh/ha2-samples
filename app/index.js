import { h, app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { ShowState } from './components/show-state.js'
import Counter from './modules/counter/index.js'

const CounterA = Counter('A', { name: 'A' })
const CounterB = Counter('B', { name: 'B', count: 3 })

app({
  init: {
    ...CounterA.init,
    ...CounterB.init,
  },
  view: state => {
    const viewsCounterA = CounterA.views(state)
    const viewsCounterB = CounterB.views(state)

    return h('body', {}, [
      h(viewsCounterA.IncDec, { title: 'Counter A', incrementOther: CounterB.actions.increment, decrementOther: CounterB.actions.decrement }),
      h(viewsCounterB.IncDec, { title: 'Counter B', incrementOther: CounterA.actions.increment, decrementOther: CounterA.actions.decrement }),
      h('hr'),
      h('div', {}, "Controlling 'Counter A' from outside"),
      h('button', { onClick: CounterA.actions.decrement }, 'Decrement A'),
      ' ',
      h('button', { onClick: CounterA.actions.increment }, 'Increment A'),
      h('hr'),
      h(ShowState, { state, indent: 3 })
    ])
  },
  node: document.getElementById('app')
})
