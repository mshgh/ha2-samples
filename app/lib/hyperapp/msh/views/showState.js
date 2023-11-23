// actions
const Init = (_, show) => show
const Toggle = show => !show

// views
const view = ({ showState, ...state }, { Toggle, html: { pre, div } }) => pre([
  div({ onclick: Toggle }, showState ? 'Hide state' : 'Show state'),
  showState && JSON.stringify(state, null, 2)
])

// build
const viewDi = ({ actions: { Toggle }, html }) => ({ Toggle, html })

export const showStateSetup = [
  ['Actions', [Init, Toggle], { focus: 'showState' }],
  ['View', view, { name: '', di: viewDi }]
]
