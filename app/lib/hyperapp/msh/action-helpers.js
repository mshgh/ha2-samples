export const Init = (_, value) => [value]

export const arrayLenCheck = (a, checkLegth, action) => {
  if (!Array.isArray(a) || checkLegth(a.length) !== true) throw new Error(`Length validation failed for '${JSON.stringify(a)}'`)
  return [action()]
}

export const swapArrayItems = (a, index1, index2) => a.map((item, idx) => idx === index1 ? a[index2] : idx === index2 ? a[index1] : item)

const evalAction = (state, action) => {
  const mergeEffects = (newState, ...effects) => [newState, ...state.slice(1), ...effects]

  if (typeof action === 'function') return evalAction(state, action(state[0]))
  if (!Array.isArray(action)) return mergeEffects(action)
  if (typeof action[0] !== 'function') return mergeEffects(...action)
  return evalAction(state, action[0](state[0], action[1]))
}

export const mergeActions = (...actions) => actions.reduce(evalAction, [{}])
