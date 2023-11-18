import { counterSetup } from '../lib/hyperapp/msh/views/counter/index.js'
import { showStateSetup } from '../lib/hyperapp/msh/views/showState.js'
import { Init } from './actions.js'
import { view } from './view.js'

const InitDi = actions => ({ InitCounter: actions.counter.Init, InitShowState: actions.showState.Init })
const viewDi = ({ views: { counter, showState }, html: { body } }) => ({ counter, showState, body })

export const simpleCounterSetup = [
  ['Include', showStateSetup, { pushNamespace: 'showState' }],
  ['Include', counterSetup, { pushNamespace: 'counter', pushFocus: 'count' }],
  ['Action', Init, { curriedDi: true, di: InitDi }],
  ['MainView', view, { di: viewDi }, { label: 'Count: ', background: 'lightblue' }]
]
