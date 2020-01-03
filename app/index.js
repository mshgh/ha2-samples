import { app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { init, view } from './app-navigation.js'

app({
  init: {
    ...init,
    addCounter: { name: '', count: 0, positive: false },
    title: 'Counter + PositiveCoutner + Namespace + Navigation + Dynamically Added Counters'
  },
  view,
  node: document.body
})
