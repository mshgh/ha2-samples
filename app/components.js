import { Typeahead } from '../lib/components.js'
import actions from './actions.js'

const AuthorTypeahead = Typeahead('rooot.author', {
  buildUrl: ({ slice: { value, limit } }) => `https://openlibrary.org/search/authors.json?q=${value}&limit=${limit}`,
  buildItems: json => json.docs.map(doc => ({ id: doc.key, displayText: doc.name })),
  onError: actions.onError,
  init: {
    value: 'a',
    fooo: 'aa', // unexpected values are ignored
    limit: 10,
    suggestions: [
      { id: 1, displayText: 'Frank Herbert' },
      { id: 2, displayText: 'Dan Simmons' },
      { id: 3, displayText: 'Terry Pratchett' },
    ]
  }
})

const BookTypeahead = Typeahead('rooot.book', {
  buildUrl: ({ slice: { value, limit } }) => `https://openlibrary.org/search.json?title=${value}&limit=${limit}`,
  buildItems: json => json.docs.map(doc => ({ id: doc.key, displayText: doc.title })),
  //onError: actions.onError, // optional handler
  init: {
    value: 'e',
    limit: 10,
    suggestions: [
      { id: 4, displayText: 'Dune' },
      { id: 5, displayText: 'Hyperion' },
      { id: 6, displayText: 'Maskerade' },
    ]
  }
})

export {
  AuthorTypeahead,
  BookTypeahead,
}