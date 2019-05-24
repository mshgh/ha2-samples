import { app } from './3pty/hyperapp.js'
import state from './state/index.js'
import views from './views/index.js'

export default node => app({
  init: () => state.counter,
  view: views.Counter,
  node
})
