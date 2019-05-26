import { h } from './3pty/hyperapp.js'

const App = state =>
  h('div', { style: { 'font-family': 'Verdana, Geneva, Tahoma, sans-serif' } }, [
    h('div', { style: { float: 'left', width: '50%' } }, 
      h(Typeahead, { ...state.author, label: 'Search an author:' })
    ),
    h('div', { style: { float: 'left', width: '50%' } }, 
      h(Typeahead, { ...state.book, label: 'Search a book:' })
    ),
    h('div', { style: { clear: 'both' } }),
    h(ShowState, state)
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

const ShowState = state =>
  h('div', { style: { border: 'black 1px solid', padding: '0.2em', 'margin-top': '0.5em' } }, [
    h('h3', { style: { margin: '0.2em', 'border-bottom': 'black 1px solid' } }, 'State'),
    h('pre', { style: { margin: '0.2em' } }, JSON.stringify(state, null, 2))
  ])

export default {
  App
}