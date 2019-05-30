const onError = (state, err) => ({ ...state, error: { ...err } })

export default {
  onError,
}