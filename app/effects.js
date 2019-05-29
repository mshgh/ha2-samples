import actions from './actions.js'

const onTimeout = (action, aprops) => (dispatch, dprops) => setTimeout(() => dispatch(action, { ...aprops, ...dprops }), dprops.delay)

const httpGet = (action, aprops) => (dispatch, dprops, e) => {
  const props = { ...aprops, ...dprops, ...e }

  fetch(typeof props.url === 'function' ? props.url(props) : props.url)
  .then(response => {
    if (!response.ok) throw new Error('HTTP error, status = ' + response.status);
    return response.json();
  })
  .then(json => dispatch(action, typeof props.result === 'function' ? props.result(json, props) : json))
  .catch(reason => {
    if (typeof props.fail !== 'function') return
    dispatch(props.fail, { message: reason.message, stack: reason.stack })
  })
}

// --- public ---
const addToCounterLater = onTimeout(actions.addToCounter, { amount: 10 })

const getAuthors = httpGet(actions.setAuthors, {
  url: ({ seed, limit = 10 }) => `https://openlibrary.org/search/authors.json?q=${seed}&limit=${limit}`,
  fail: actions.setError,
  result: json => json.docs.map(doc => ({ id: doc.key, displayText: doc.name })),
})

const getBooks = httpGet(actions.setBooks, {
  url: ({ seed, limit = 10 }) => `https://openlibrary.org/search.json?title=${seed}&limit=${limit}`,
  fail: actions.setError,
  result: json => json.docs.map(doc => ({ id: doc.key, displayText: doc.title })),
})

export default {
  addToCounterLater,
  getAuthors,
  getBooks,
}