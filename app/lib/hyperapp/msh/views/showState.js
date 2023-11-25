import { Init } from '../action-helpers.js'

// actions
const Toggle = show => !show

// views
const view = ({ showState, ...state }, {
  Toggle,
  html: { pre, div }
}) => pre([
  div({ onclick: Toggle }, showState ? 'Hide state' : 'Show state'),
  showState && JSON.stringify(state, null, 2)
])

// build
const viewDi = ({ actions: { Toggle }, html: { pre, div } }) => ({ Toggle, html: { pre, div } })

export const showStateSetup = [
  ['Actions', [Init, Toggle], { focus: 'showState' }],
  ['View', view, { name: '', di: viewDi }]
]
