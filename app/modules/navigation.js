import { module } from '../../lib/modules.js'

export default function Navigation(slice, { MasterPage, defaultPage, Menu = () => { }, menuItems = [] } = {}) {

  const [navigation] = module(slice,
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
      views({ slice, state }) {
        return {
          View(props) {
            return MasterPage(state, {
              Menu: Menu(state, { links: links.all }, props),
              Page: links.map[slice.pageName].Page(state, props)
            }, props)
          }
        }
      }
    }
  )

  // TODO: hierarchical navigation menu support
  const links = menuItems.reduce((acc, { name, label, Page }) => {

    const navigate = [navigation.actions.navigate, () => name]
    acc.all.push({ label, onclick: navigate })
    acc.map[name] = { Page, navigate }

    return acc

  }, { all: [], map: {} })

  return {
    init: navigation.init,
    navigateTo(name) {
      return links.map[name].navigate
    },
    View(props) {
      return function (state) {
        return navigation.views(state).View(props)
      }
    }
  }
}
