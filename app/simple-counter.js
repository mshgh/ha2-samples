import { app } from './lib/hyperapp/v2.0.22.min.js'
import { haBuild } from './lib/hyperapp/msh/build.js'
import { simpleCounterSetup } from './views/simple-counter.js'

const showState = true
const count = 3

const main = async node => {
  const { view, actions: { Init } } = haBuild(simpleCounterSetup)
  app({ node, view, init: Init({ foo: 'bar' }, { count, showState }) })
}
main(document.body).catch(console.log)
