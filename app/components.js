import { h } from './3pty/hyperapp.js'

// --- Typeahead ---
const typeaheadOninput = (_, { update, buildUrl, buildSuggestions, onError }) => (state, e) => {
  const newState = update(state, { pending: true, value: e.target.value })
  const apiCall = dispatch => {
    fetch(buildUrl(newState))
    .then(response => {
      if (!response.ok) throw new Error('HTTP error, status = ' + response.status);
      return response.json();
    })
    .then(json => dispatch(update, { pending: false, suggestions: buildSuggestions(json) }))
    .catch(reason => {
      dispatch(update, { pending: false })
      if (typeof onError === 'function') dispatch(onError, { message: reason.message, stack: reason.stack })
    })
  }
  
  return [ newState, [ apiCall ] ]
}

const TypeaheadSuggestion = ({ id, displayText }) => h('li', { id }, displayText)
const TypeaheadSuggestions = ({ suggestions = [] }) => h('ul', null, suggestions.map(suggestion => h(TypeaheadSuggestion, { ...suggestion })))
export const Typeahead = ({ label, value, suggestions, update, buildUrl, buildSuggestions, onError }) =>
  [
    h('h4', null, label),
    h('input', { type: 'text', value, oninput: [ typeaheadOninput, { update, buildUrl, buildSuggestions, onError } ] }),
    h(TypeaheadSuggestions, { suggestions })
  ]
// --- Typeahead ---

// --- ShowState ---
export const ShowState = state =>
  h('div', { style: { border: 'black 1px solid', padding: '0.2em', 'margin-top': '0.5em' } }, [
    h('h3', { style: { margin: '0.2em', 'border-bottom': 'black 1px solid' } }, 'State'),
    h('pre', { style: { margin: '0.2em' } }, JSON.stringify(state, null, 2))
  ])
// --- ShowState ---