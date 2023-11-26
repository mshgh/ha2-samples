import { toHtml } from '../../lib/hyperapp/msh/html.js'
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
const h = toHtml('body', 'button')
const view = ({ counters }, {
  background,
  counter, showState
}) => h.body([
  counters.map(({ label }, index) => [
    counter.view({ label, background, index }),
    h.button({ onclick: [counter.Delete, index] }, 'Del'),
    h.button({ onclick: [counter.MoveUp, index] }, 'Up'),
    h.button({ onclick: [counter.MoveDown, index] }, 'Down')
  ]),
  h.button({ onclick: [counter.Insert, { index: 2, label: 'Foo', count: 15 }] }, 'Add'),
  showState.view()
])

// build
const InitDi = ({ counters, showState }) => ({ InitCounters: counters.Init, InitShowState: showState.Init })
const viewDi = ({
  views: { counters, showState },
  actions: { counters: { InsertItem, DeleteItem, MoveItemUp, MoveItemDown } },
}) => ({
  showState: { view: showState },
  counter: { view: counters.item, Insert: InsertItem, Delete: DeleteItem, MoveUp: MoveItemUp, MoveDown: MoveItemDown },
})

export const repeatCounterSetup = [
  ['Include', showStateSetup, { namespace: 'showState' }],
  ['Scope', { namespace: 'counters', focus: 'counters' }, repeaterSetup([
    ['Include', counterSetup, { focus: 'count' }]
  ])],
  ['Action', Init, { di: InitDi, curriedDi: true }],
  ['MainView', view, { di: viewDi }, { label: 'Count: ', background: 'lightblue', index: 1 }]
]
