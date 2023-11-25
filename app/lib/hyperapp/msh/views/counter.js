import { Init } from '../action-helpers.js'

// actions
const Inc = state => state + 1
const Dec = state => state - 1

// views
const view = (state, {
  label, background,
  Inc, Dec,
  html: { div, button }
}) => div({ style: { background } }, [
  label,
  button({ onclick: [Dec] }, '-'),
  state,
  button({ onclick: [Inc] }, '+')
])

// build
const viewDi = ({ actions: { Inc, Dec }, html: { div, button } }) => ({ Inc, Dec, html: { div, button } })

export const counterSetup = [
  ['Actions', [Init, Inc, Dec]],
  ['View', view, { name: '', di: viewDi }]
]
