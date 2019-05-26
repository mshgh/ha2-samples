const init = () => ({
  author: {
    value: 'a',
    limit: 10,
    suggestions: [
      { id: 1, displayText: 'Frank Herbert' },
      { id: 2, displayText: 'Dan Simmmons' },
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

export default {
  init
}
// https://openlibrary.org/search/authors.json?q=herbert&limit=1&mode=ebooks