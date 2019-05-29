const init = () => ({
  pending: false,
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

const updateAuthor = (state, value) => ({ ...state, author: { ...state.author, value } })

const updateBook = (state, value) => ({ ...state, book: { ...state.book, value } })

const setAuthors = (state, suggestions) => ({ ...state, pending: false, author: { ...state.author, suggestions } })

const setBooks = (state, suggestions) => ({ ...state, pending: false, book: { ...state.book, suggestions } })

const setError = (state, error) => ({ ...state, pending: false, error })

const setPending = (state, status) => ({ ...state, pending: status })

export default {
  init,
  updateAuthor,
  updateBook,
  setAuthors,
  setBooks,
  setError,
  setPending,
}