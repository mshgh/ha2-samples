import module from '../module.js'

export default (slice) => (({ 1: child }) => ({
  add: (Module, slice, props) => Module(child(slice), props)
}))(module(slice))

/*
 * this is identical code as the one above only not so condensed to be easy understand
 *
export default (slice) => {
  const { 1: child } = module(slice)

  return {
    add: (Module, slice, props) => Module(child(slice), props)
  }
}
*/
