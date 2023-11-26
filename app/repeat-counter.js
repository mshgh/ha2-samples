import { app } from './lib/hyperapp/v2.0.22.min.js'
import { haBuild } from './lib/hyperapp/msh/build.js'
import { repeatCounterSetup } from './views/repeat-counter/index.js'

const showState = true
const counters = [
  { label: 'Apples', count: 3 },
  { label: 'Pears', count: 7 },
  { label: 'Lemons', count: 11 },
]

const main = async node => {
  const { view, actions: { Init } } = haBuild(repeatCounterSetup)
  app({ node, view, init: Init({ foo: 'bar' }, { counters, showState }) })
}
main(document.body).catch(console.log)
