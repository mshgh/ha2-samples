export const view = (_state, {
  counter, showState, body,
  ...props
}) => body([
  counter(props),
  showState()
])
