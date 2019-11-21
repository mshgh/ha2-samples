import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'

export default (localState, moduleState, { increment, decrement }) => {

  const ShowStats = name => ({ label }) => h('div', {}, `[${label}] Counter '${name}' clicks stats: ${localState.clicks}/${moduleState.clicks}`)

  const IncDecView = state => () =>
    h('p', {}, [
      h('button', { onclick: decrement }, ' - '),
      state,
      h('button', { onclick: increment }, ' + ')
    ])

  return {
    ShowStats,
    IncDecView,
  }
}
