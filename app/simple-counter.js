import { app } from './lib/hyperapp/v2.0.22.min.js'
import { build } from './lib/hyperapp/msh/build.min.js' // .min
import { html } from './lib/hyperapp/msh/html.js'
import { simpleCounterSetup } from './simple-counter/index.js'

const main = async node => {
  const { view, actions: { Init } } = build(simpleCounterSetup, { buildDi: { html } })

  return app({
    init: Init({}, { count: 3 }),
    view,
    node
  })
}
main(document.body).catch(console.log)
