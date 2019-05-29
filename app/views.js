import { h } from './3pty/hyperapp.js'
import { Typeahead, ShowState } from './components.js'
import actions from './actions.js'
import effects from './effects.js'

const App = state =>
  h('div', { style: { 'font-family': 'Verdana, Geneva, Tahoma, sans-serif' } }, [
    h('div', null, [
      h('div', { style: { float: 'left', width: '50%' } }, 
        h(Typeahead, { ...state.author, label: 'Search an author:', updateValue: actions.updateAuthor, onRefresh: effects.getAuthors })
      ),
      h('div', { style: { float: 'left', width: '50%' } }, 
        h(Typeahead, { ...state.book, label: 'Search a book:', updateValue: actions.updateBook, onRefresh: effects.getBooks })
      ),
      h('div', { style: { clear: 'both' } }),
    ]),
    h(ShowState, state)
  ])

export default {
  App
}