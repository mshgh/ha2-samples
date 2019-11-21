export default (localState, moduleState) => {

  const increment = x => {
    ++localState.clicks
    ++moduleState.clicks
    return x + 1
  }

  const decrement = x => {
    ++localState.clicks
    ++moduleState.clicks
    return x - 1
  }

  return {
    increment,
    decrement
  }
}
