import { Init } from '../action-helpers.js'
import { toHtml } from '../html.js'

// actions
const Toggle = show => !show

// views
const h = toHtml('pre', 'div')
const view = ({ showState, ...state }, {
  indent = 2,
  Toggle
}) => h.pre([
  h.div({ onclick: Toggle }, showState ? 'Hide state' : 'Show state'),
  showState && JSON.stringify(state, null, indent)
])

// build
const viewDi = ({ actions: { Toggle } }) => ({ Toggle })

export const showStateSetup = [
  ['Actions', [Init, Toggle], { focus: 'showState' }],
  ['View', view, { name: '', di: viewDi }]
]
