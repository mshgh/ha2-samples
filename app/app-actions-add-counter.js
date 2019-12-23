export function oninputName(state, event) {
  return { ...state, addCounter: { ...state.addCounter, name: event.target.value } }
}

export function oninputCount(state, event) {
  return { ...state, addCounter: { ...state.addCounter, count: nanToZero(event.target.value * 1) } }

  function nanToZero(value) {
    return Object.is(value, NaN) ? 0 : value
  }
}

export function oninputPositive(state, event) {
  return { ...state, addCounter: { ...state.addCounter, positive: event.target.checked } }
}
