(async () => {
  const haModule = import('./app/3pty/hyperapp.js')
  const viewsModule = import('./app/views/index.js')
  const stateModule = import('./app/state/index.js')

  const { app } = await haModule
  const { default:state } = await stateModule
  const { default:views } = await viewsModule
  app({
    init: () => state.counter,
    view: views.Counter,
    node: document.getElementById('app')
  })
})();
