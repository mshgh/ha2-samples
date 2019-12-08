import { app } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { view } from './app-views.js'
import { init } from './app-modules.js'

app({ init, view, node: document.body })
