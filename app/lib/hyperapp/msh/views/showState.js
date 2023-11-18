// actions
const Init = (_, show) => show
const Toggle = show => !show

// views
const view = (
  {
    Toggle,
    html: { pre, div }
  }
) => ({ showState, ...state } = {}) => pre([
  div({ onclick: Toggle }, showState ? 'Hide state' : 'Show state'),
  showState && JSON.stringify(state, null, 2)
])

// build
const viewDi = ({ actions: { Toggle }, html }) => ({ Toggle, html })

export const showStateSetup = [
  ['Actions', [Init, Toggle], { pushFocus: 'showState' }],
  ['View', view, { name: '', curriedDi: true, di: viewDi }]
]
