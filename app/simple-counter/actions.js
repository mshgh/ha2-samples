export const Init = ({ InitCounter, InitShowState }) => (state, { count, showState }) => [
  [InitCounter, count],
  [InitShowState, showState]
].reduce((state, [actions, props]) => actions(state, props), state)
