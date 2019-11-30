import { h, app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import mapModule from './map-module.js'
import Counter from './modules/counter/index.js'
import { ShowState } from './components/show-state.js'

const CounterA = mapModule(Counter, state => state.A, (state, A) => ({ ...state, A }))
const CounterB = mapModule(Counter, state => state.B, (state, B) => ({ ...state, B }))

app({
  init: {
    ...CounterA.init(),
    ...CounterB.init(3),
  },
  view: state => {
    const viewsCounterA = CounterA.views(state)
    const viewsCounterB = CounterB.views(state)

    return h('body', {}, [
      h(viewsCounterA.IncDec, { title: 'Counter A', incrementOther: CounterB.increment, decrementOther: CounterB.decrement }),
      h(viewsCounterB.IncDec, { title: 'Counter B', incrementOther: CounterA.increment, decrementOther: CounterA.decrement }),
      h('hr'),
      h('div', {}, "Controlling 'Counter A' from outside"),
      h('button', { onClick: CounterA.decrement }, 'Decrement A'),
      ' ',
      h('button', { onClick: CounterA.increment }, 'Increment A'),
      h('hr'),
      h(ShowState, { state, indent: 3 })
    ])
  },
  node: document.getElementById('app')
})
