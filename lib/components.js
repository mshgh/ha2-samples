import { h } from 'https://unpkg.com/hyperapp@2.0.0-beta.12/src/index.js?module'

const squirrel = (path = [], lens) => {
  const [key, ...rest] = [ ...path ].reverse()
  if (rest.length) lens = squirrel(rest, lens)
  const F = f => (x = {}) => typeof key === 'undefined' ? { ...x, ...f(x) } : { ...x, [key]: f(x[key]) }
  return lens ? x => lens(F(x)) : F
}

// --- Typeahead ---
export const Typeahead = (path, { init: initialState, buildUrl, buildItems, onError }) => {
  const lState = {}
  const getStateUpdater = (lens => v=>lens(s=>lState.slice={...s,...v}))(squirrel(path.split('.')))

  const init = state => {
    const { value = '', limit = 10, suggestions = [] } = initialState
    
    lState.suggestions = suggestions
    return getStateUpdater({ value, limit, pending: false, error: null })(state)
  }
  
  const oninput = (_, _props) => (state, e) => [
    getStateUpdater({ pending: true, error: null, value: e.target.value })(state),
    [ (dispatch, props) => {
      if (lState.inProgress) return
      lState.inProgress = lState.slice

      fetch(buildUrl(lState))
      .then(response => {
        if (!response.ok) throw new Error('HTTP error, status = ' + response.status);
        return response.json();
      })
      .then(json => {
        lState.suggestions = buildItems(json)
        const runSkipped = lState.inProgress.value !== lState.slice.value
        lState.inProgress = null
        if (runSkipped) dispatch([ oninput, props ], { target: { value: lState.slice.value } })
        else dispatch(getStateUpdater({ pending: false }))
      })
      .catch(err => {
        lState.pending = null
        lState.suggestions = []
        dispatch(getStateUpdater({ pending: false, error: { message: err.message, stack: err.stack } }))
        if (typeof onError === 'function') dispatch(onError, { message: err.message, stack: err.stack })
      })
    }, _props ]
  ]

  const Suggestion = ({ id, displayText }) => h('li', { id }, displayText)

  const View = props => {
    const { label, value } = { ...lState.slice, ...props }

    return [
      h('h4', null, label),
      h('input', { type: 'text', value, oninput: [ oninput ] }),
      h('ul', null, lState.suggestions.map(suggestion => h(Suggestion, suggestion)))
    ]
  }

  return {
    init,
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