import { mergeActions } from '../lib/hyperapp/msh/action-helpers.js'
import { toHtml } from '../lib/hyperapp/msh/html.js'
import { counterSetup } from '../lib/hyperapp/msh/views/counter.js'
import { showStateSetup } from '../lib/hyperapp/msh/views/showState.js'

// actions
const Init = ({ InitCounter, InitShowState }) => (state, { count, showState }) => mergeActions(
  state,
  [InitCounter, count],
  [InitShowState, showState]
)

// views
const h = toHtml('body')
const view = (_state, {
  label,
  counter, showState  
}) => h.body([
  counter.view({ label }),
  showState.view({ indent: 1 })
])

// build
const InitDi = actions => ({ InitCounter: actions.counter.Init, InitShowState: actions.showState.Init })
const viewDi = ({ views: { counter, showState } }) => ({
  counter: { view: counter },
  showState: { view: showState }
})

export const simpleCounterSetup = [
  ['Include', showStateSetup, { namespace: 'showState' }],
  ['Include', counterSetup, { namespace: 'counter', focus: 'count' }],
  ['Action', Init, { curriedDi: true, di: InitDi }],
  ['MainView', view, { di: viewDi }, { label: 'Count: ', background: 'lightblue' }]
]
