import { h } from './3pty/hyperapp.js'

const oninput = (_, { updateValue, onRefresh }) => (state, e) => [ updateValue({ ...state, pending: true }, e.target.value), [ onRefresh, { seed: e.target.value } ] ]

// --- Typeahead ---
const TypeaheadSuggestion = ({ id, displayText }) => h('li', { id }, displayText)
const TypeaheadSuggestions = ({ suggestions }) => h('ul', null, suggestions.map(suggestion => h(TypeaheadSuggestion, { ...suggestion })))
export const Typeahead = ({ label, value, suggestions = [], updateValue, onRefresh }) =>
  [
    h('h4', null, label),
    h('input', { type: 'text', value, oninput: [ oninput, { updateValue, onRefresh } ] }),
    h(TypeaheadSuggestions, { suggestions })
  ]

// --- ShowState ---
export const ShowState = state =>
  h('div', { style: { border: 'black 1px solid', padding: '0.2em', 'margin-top': '0.5em' } }, [
    h('h3', { style: { margin: '0.2em', 'border-bottom': 'black 1px solid' } }, 'State'),
    h('pre', { style: { margin: '0.2em' } }, JSON.stringify(state, null, 2))
  ])
