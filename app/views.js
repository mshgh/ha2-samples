import { h } from './3pty/hyperapp.js'

const App = state =>
  h('div', {}, [
    h('div', { style: { float: 'left', width: '50%' } }, 
      h(Typeahead, { ...state.author, label: 'Search for an author:' })
    ),
    h('div', { style: { float: 'left', width: '50%' } }, 
      h(Typeahead, { ...state.book, label: 'Search for a book:' })
    ),
    h('div', { style: { clear: 'both' } })
  ])

// --- components ---
const Typeahead = ({ label, value, suggestions = [] }) =>
  [
    h('h4', {}, label),
    h('input', { value }),
    h(TypeaheadSuggestions, { suggestions })
  ]
const TypeaheadSuggestions = ({ suggestions }) => h('ul', {}, suggestions.map(suggestion => h(TypeaheadSuggestion, { ...suggestion })))
const TypeaheadSuggestion = ({ id, displayText }) => h('li', { id }, displayText)

export default {
  App
}