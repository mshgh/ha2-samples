import { h } from './3pty/hyperapp.js'

const App = state =>
  h("div", {}, [
    h("h1", {}, state),
    h("button", { onclick: state => state - 1 }, "-"),
    h("button", { onclick: state => state + 1 }, "+")
  ])

export default {
  App
}