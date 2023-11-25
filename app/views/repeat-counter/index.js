import { showStateSetup } from '../../lib/hyperapp/msh/views/showState.js'
import { counterSetup } from '../../lib/hyperapp/msh/views/counter.js'
import { repeaterSetup } from '../../lib/hyperapp/msh/views/repeater.js'
import { mergeActions } from '../../lib/hyperapp/msh/action-helpers.js'

// actions
const Init = ({ InitCounters, InitShowState }) => (state, { counters, showState }) => mergeActions(
  state,
  [InitCounters, counters],
  [InitShowState, showState]
)

// views
const view = ({ counters }, {
  background,
  counter, showState,
  html: { body, button }
}) => body([
  counters.map(({ label, count }, index) => counter.view({ label, count, background, index })),
  button({ onclick: [counter.Insert, { index: 2, label: 'Foo', count: 15 }] }, 'Add'),
  showState()
])

// build
const InitDi = actions => ({ InitCounters: actions.counters.Init, InitShowState: actions.showState.Init })
const viewDi = ({
  views: { counters, showState },
  actions: { counters: { InsertItem, DeleteItem, MoveItemUp, MoveItemDown } },
  html: { body, button }
}) => ({
  showState,
  counter: { view: counters.item, Insert: InsertItem, Delete: DeleteItem, MoveUp: MoveItemUp, MoveDown: MoveItemDown },
  html: { body, button }
})

export const repeatCounterSetup = [
  ['Include', showStateSetup, { namespace: 'showState' }],
  ['Scope', { namespace: 'counters', focus: 'counters' }, repeaterSetup([
    ['Include', counterSetup, { focus: 'count' }]
  ])],
  ['Action', Init, { di: InitDi, curriedDi: true }],
  ['MainView', view, { di: viewDi }, { label: 'Count: ', background: 'lightblue', index: 1 }]
]
