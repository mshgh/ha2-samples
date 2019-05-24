import { h } from '../3pty/hyperapp.js'

export default state =>
  h("div", {}, [
    h("h1", {}, state),
    h("button", { onclick: state => state - 1 }, "-"),
    h("button", { onclick: state => state + 1 }, "+")
  ])
