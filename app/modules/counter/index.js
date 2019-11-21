import map from 'https://unpkg.com/hyperapp-map@1.1.0/src/index.js'
import getViews from './counter-views.js'
import getActions from './counter-actions.js'

const moduleState = { clicks: 0 }

export default name => {

  const localState = { clicks: 0 }

  const slice = state => state[name]
  const merge = (state, slice) => ({ ...state, [name]: slice })
  const mapView = (state, view) => ({ [view.name + name]: (props, ...children) => map(slice, merge)(view(slice(state))(props, ...children)) })

  const actions = getActions(localState, moduleState)
  const { ShowStats, IncDecView } = getViews(localState, moduleState, actions)

  return {
    init: (value = 0) => ({ [name]: value }),
    ShowStats: ShowStats(name),
    views: state => ({
      ...mapView(state, IncDecView),
    }),
  }
}
