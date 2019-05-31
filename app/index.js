import { h } from 'https://unpkg.com/hyperapp@2.0.0-beta.12/src/index.js?module'
import { ShowState } from '../lib/components.js'
import { AuthorTypeahead, BookTypeahead } from './components.js'

export const init = () => [
    AuthorTypeahead.init,
    BookTypeahead.init,
  ]
  .reduce((res, fn) => fn(res), {
    showState: true,
    error: null,
  })

export const view = state =>
  h('div', { style: { 'font-family': 'Verdana, Geneva, Tahoma, sans-serif' } }, [
    h('div', null, [
      h('div', { style: { float: 'left', width: '50%' } }, 
        h(AuthorTypeahead.View, { label: 'Search an author:' })
      ),
      h('div', { style: { float: 'left', width: '50%' } }, 
        h(BookTypeahead.View, { label: 'Search a book:' })
      ),
      h('div', { style: { clear: 'both' } }),
    ]),
    state.showState && h(ShowState, state),
  ])
