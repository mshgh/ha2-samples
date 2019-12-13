import { app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { init } from '../lib/modules.js'
import view from './app-navigation.js'

app({
  init: {
    ...init,
    title: 'Counter + PositiveCoutner + Namespace + Navigation'
  },
  view,
  node: document.body
})
