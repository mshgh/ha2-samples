import { h } from 'https://unpkg.com/hyperapp@2.0.0-beta.12/src/index.js?module'

const getLens = (path = [], lens) => {
  const [key, ...rest] = [ ...path ].reverse()
  if (rest.length) lens = getLens(rest, lens)
  const F = f => (x = {}) => typeof key === 'undefined' ? { ...x, ...f(x) } : { ...x, [key]: f(x[key]) }
  return lens ? x => lens(F(x)) : F
}

const getSlice = (obj, path = []) => path.reduce((res, seg) => res[seg], obj)

// --- Typeahead ---
export const Typeahead = ({ statePath, buildUrl, buildSuggestions, onError, init }) => {
  const path = statePath.split('.')
  const getUpdater = (lens => values => lens(state => ({ ...state, ...values })))(getLens(path))
  
  const oninput = () => (state, e) => {
    const newState = getUpdater({ pending: true, value: e.target.value })(state)

    return [ newState, [ dispatch => {
      fetch(buildUrl(getSlice(newState, path)))
      .then(response => {
        if (!response.ok) throw new Error('HTTP error, status = ' + response.status);
        return response.json();
      })
      .then(json => dispatch(getUpdater({ pending: false, suggestions: buildSuggestions(json) })))
      .catch(reason => {
        dispatch(getUpdater({ pending: false, suggestions: [] }))
        if (typeof onError === 'function') dispatch(onError, { message: reason.message, stack: reason.stack })
      })
    }]]
  }

  const Suggestion = ({ id, displayText }) => h('li', { id }, displayText)

  const View = state => props => {
    const { label, value, suggestions } = { ...getSlice(state, path), ...props }
    return [
      h('h4', null, label),
      h('input', { type: 'text', value, oninput: [ oninput ] }),
      h('ul', null, suggestions.map(suggestion => h(Suggestion, suggestion)))
    ]
  }

  return {
    init: getUpdater(init),
    View,
  }
}
// --- Typeahead ---

// --- ShowState ---
export const ShowState = state =>
  h('div', { style: { border: 'black 1px solid', padding: '0.2em', 'margin-top': '0.5em' } }, [
    h('h3', { style: { margin: '0.2em', 'border-bottom': 'black 1px solid' } }, 'State'),
    h('pre', { style: { margin: '0.2em' } }, JSON.stringify(state, null, 2))
  ])
// --- ShowState ---