import { mergeActions } from '../lib/hyperapp/msh/action-helpers.js'
import { counterSetup } from '../lib/hyperapp/msh/views/counter.js'
import { showStateSetup } from '../lib/hyperapp/msh/views/showState.js'

// actions
const Init = ({ InitCounter, InitShowState }) => (state, { count, showState }) => mergeActions(
  state,
  [InitCounter, count],
  [InitShowState, showState]
)

// views
const view = (_state, {
  label, count,
  counter, showState,
  html: { body }
}) => body([
  counter({ label, count }),
  showState()
])

// build
const InitDi = actions => ({ InitCounter: actions.counter.Init, InitShowState: actions.showState.Init })
const viewDi = ({ views: { counter, showState }, html: { body } }) => ({ counter, showState, html: { body } })

export const simpleCounterSetup = [
  ['Include', showStateSetup, { namespace: 'showState' }],
  ['Include', counterSetup, { namespace: 'counter', focus: 'count' }],
  ['Action', Init, { curriedDi: true, di: InitDi }],
  ['MainView', view, { di: viewDi }, { label: 'Count: ', background: 'lightblue' }]
]
