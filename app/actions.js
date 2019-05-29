const init = () => ({
  showState: true,
  error: null,
  author: {
    value: 'a',
    limit: 10,
    suggestions: [
      { id: 1, displayText: 'Frank Herbert' },
      { id: 2, displayText: 'Dan Simmons' },
      { id: 3, displayText: 'Terry Pratchett' }
    ]
  },
  book: {
    value: 'e',
    limit: 10,
    suggestions: [
      { id: 4, displayText: 'Dune' },
      { id: 5, displayText: 'Hyperion' },
      { id: 6, displayText: 'Maskerade' }
    ]
  }
})

const onError = (state, err) => ({ ...state, error: { ...err } })

const authorUpdate = (state, author) => ({ ...state, author: { ...state.author, ...author } })
const authorBuildUrl = ({ author: { value, limit }}) => `https://openlibrary.org/search/authors.json?q=${value}&limit=${limit}`
const authorBuildSuggestions = json => json.docs.map(doc => ({ id: doc.key, displayText: doc.name }))

const bookUpdate = (state, book) => ({ ...state, book: { ...state.book, ...book } })
const bookBuildUrl = ({ book: { value, limit }}) => `https://openlibrary.org/search.json?title=${value}&limit=${limit}`
const bookBuildSuggestions = json => json.docs.map(doc => ({ id: doc.key, displayText: doc.title }))

export default {
  init,
  onError,
  author: {
    update: authorUpdate,
    buildUrl: authorBuildUrl,
    buildSuggestions: authorBuildSuggestions,
  },
  book: {
    update: bookUpdate,
    buildUrl: bookBuildUrl,
    buildSuggestions: bookBuildSuggestions,
  },
}