import { module } from '../../lib/modules.js'

export default function Navigation(slice, { MasterPage, defaultPage, Menu = () => { }, menuItems = [] } = {}) {

  const [navigation] = module(slice,
    {
      init: {
        pageName: defaultPage
      },
      actions: {
        navigate: (state, pageName) => ({ ...state, pageName })
      },
      views: ({ pageName }) => ({
        View: (state, props) => MasterPage(state, {
          Menu: Menu(state, { links: links.all }, props),
          Page: links.map[pageName].Page(state, props)
        }, props)
      })
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
    navigateTo: name => links.map[name].navigate,
    View: props => state => navigation.views(state).View(state, props)
  }
}
