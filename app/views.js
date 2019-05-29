import { h } from 'https://unpkg.com/hyperapp@2.0.0-beta.12/src/index.js?module'
import { Typeahead, ShowState } from './components.js'
import actions from './actions.js'

const App = state =>
  h('div', { style: { 'font-family': 'Verdana, Geneva, Tahoma, sans-serif' } }, [
    h('div', null, [
      h('div', { style: { float: 'left', width: '50%' } }, 
        h(Typeahead, { ...state.author, ...actions.author, onError: actions.onError, label: 'Search an author:' })
      ),
      h('div', { style: { float: 'left', width: '50%' } }, 
        h(Typeahead, { ...state.book, ...actions.book, onError: actions.onError, label: 'Search a book:' })
      ),
      h('div', { style: { clear: 'both' } }),
    ]),
    state.showState && h(ShowState, state)
  ])

export default {
  App
}