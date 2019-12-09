import { app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { init } from '../lib/modules.js'
import { Page } from './app-components.js'
import { modules } from './app-modules.js'

const actions = modules.map(m => m.actions)
const views = modules.map(m => m.views)

app({
  init: {
    ...init,
    title: 'Counter + PositiveCoutner + Namespace'
  },
  view: state => Page({ state, title: state.title, actions, views: views.map(v => v(state)) }),
  node: document.body
})
