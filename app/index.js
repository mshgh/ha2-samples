import { app, h, text } from './lib/hyperapp/v2.0.22.min.js'

const main = async () => {
  app({
    view: () => h('body', {}, h('div', {}, text('HelloWorld'))),
    node: document.body
  })
}

main().catch(console.log)
