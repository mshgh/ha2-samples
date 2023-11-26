import { Init } from '../action-helpers.js'
import { toHtml } from '../html.js'

// actions
const Inc = state => state + 1
const Dec = state => state - 1

// views
const h = toHtml('div', 'button')
const view = (state, {
  label, background,
  Inc, Dec
}) => h.div({ style: { background } }, [
  label,
  h.button({ onclick: [Dec] }, '-'),
  state,
  h.button({ onclick: [Inc] }, '+')
])

// build
const viewDi = ({ actions: { Inc, Dec } }) => ({ Inc, Dec })

export const counterSetup = [
  ['Actions', [Init, Inc, Dec]],
  ['View', view, { name: '', di: viewDi }]
]
