import { module } from '../../lib/modules.js'

export default function Navigation(slice, { MasterPage, defaultPage, Menu = () => { }, menuItems = [] } = {}) {
  const { init, actions, view } = module(slice,
    {
      init: {
        pageName: defaultPage
      },
      actions: {
        navigate(state, pageName) {
          return {
            ...state,
            pageName
          }
        }
      },
      view({ slice, state }, props) {
        return MasterPage(state, {
          Menu: Menu(state, { links: links.all }, props),
          Page: links.map[slice.pageName].Page(state, props)
        }, props)
      }
    }
  )
  // TODO: hierarchical navigation menu support
  const links = menuItems.reduce((acc, { name, label, Page }) => {
    const navigate = [actions.navigate, name]
    acc.all.push({ label, onclick: navigate })
    acc.map[name] = { Page, navigate }

    return acc
  }, { all: [], map: {} })

  return {
    init,
    navigateTo(name) {
      return links.map[name].navigate
    },
    view
  }
}
