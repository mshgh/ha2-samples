import { h, app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { ShowState } from './components/show-state.js'
import Counter from './modules/counter/index.js'

const CounterA = Counter('A')
const CounterB = Counter('B')

app({
  init: {
    ...CounterA.init(),
    ...CounterB.init(3),
  },
  view: state => {
    const { IncDecViewA } = CounterA.views(state)
    const { IncDecViewB } = CounterB.views(state)

    return h('body', {}, [
      h(IncDecViewA),
      h(IncDecViewB),
      h('p', {}, [
        h(CounterA.ShowStats, { label: '#1' }),
        h(CounterB.ShowStats, { label: '#2' })
      ]),
      h(ShowState, { state, indent: 3 })
    ])
  },
  node: document.getElementById('app')
})
