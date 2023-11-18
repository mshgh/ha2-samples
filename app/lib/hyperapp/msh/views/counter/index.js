import { Init, Dec, Inc } from './actions.js'
import { view } from './views.js'

const viewDi = ({ actions: { Inc, Dec }, html }) => ({ Inc, Dec, html })

export const counterSetup = [
  ['Actions', [Init, Inc, Dec]],
  ['View', view, { name: '', di: viewDi }]
]
