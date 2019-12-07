import { app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { Page } from './app-components.js'
import { modules } from './app-modules.js'

app({
  init: modules.reduce((init, m) => ({ ...init, ...m.init }), {}),
  view: Page(modules.map(m => m.actions), modules.map(m => m.views)),
  node: document.body
})
