import Navigation from './modules/navigation.js'
import { Body, Div, Separator, AppTitle, ButtonLink } from './components/helpers.js'
import { ShowState } from './components/show-state.js'
import { WelcomeMessage, Counters, Settings } from './app-components.js'
import { modules } from './app-modules.js'

const actions = modules.map(m => m.actions)
const views = modules.map(m => m.views)

const WelcomePage = (_, { navigateToCounters, navigateToSettings }) => WelcomeMessage({ navigateToCounters, navigateToSettings })
const CountersPage = state => Counters({ actions, views: views.map(v => v(state)) })
const SettingsPage = state => Settings(views.map(v => v(state)))

const navigation = Navigation('nav', {
  MasterPage: (state, { Menu, Page }) => Body(
    Menu,
    AppTitle(state.title),
    Page,
    Separator,
    ShowState({ state })
  ),
  defaultPage: 'nav.home',
  Menu: (state, { links }) => Div(links.map(({ label, onclick }) => ButtonLink(label, onclick))),
  menuItems: [
    { name: 'nav.home', label: 'Home page', Page: WelcomePage },
    { name: 'nav.counters', label: 'Counters', Page: CountersPage },
    { name: 'nav.settings', label: 'Settings', Page: SettingsPage }
  ]
})

export { init } from '../lib/modules.js'
export const view = navigation.View({
  navigateToCounters: navigation.navigateTo('nav.counters'),
  navigateToSettings: navigation.navigateTo('nav.settings'),
})
