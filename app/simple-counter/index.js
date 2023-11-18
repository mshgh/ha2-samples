import { counterSetup } from '../lib/hyperapp/msh/views/counter/index.js'
import { Init } from './actions.js'
import { view } from './view.js'

const InitDi = actions => ({ InitCounter: actions.counter.Init })
const viewDi = ({ views: { counter } }) => ({ counter })

export const simpleCounterSetup = [
  ['Include', counterSetup, { pushNamespace: 'counter', pushFocus: 'count' }],
  ['Action', Init, { curriedDi: true, di: InitDi }],
  ['MainView', view, { di: viewDi }]
]
