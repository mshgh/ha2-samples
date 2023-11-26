import { app } from './lib/hyperapp/v2.0.22.min.js'
import { haBuild } from './lib/hyperapp/msh/build.js'
import { reversedCounterSetup } from './views/reversed-counter.js'

const showState = true
const count = 3

const main = async node => {
  const { view, actions: { Init } } = haBuild(reversedCounterSetup)
  app({ node, view, init: Init({ foo: 'bar' }, { count, showState }) })
}
main(document.body).catch(console.log)
