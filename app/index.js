import { app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import navigation from './app-navigation.js'

app({
  init: {
    ...navigation.init,
    addCounter: { name: '', count: 0, positive: false },
    title: 'Counter + PositiveCoutner + Namespace + Navigation + Dynamically Added Counters'
  },
  view: navigation.view,
  node: document.body
})
