import { Div, TextLink } from './components/helpers.js'
import { indexes as module } from './app-modules.js'

export const WelcomeMessage = ({ navigateToCounters, navigateToSettings }) => Div(
  'Welcome to our weird Counter App. You can use the top level navigation or jump directly into ', TextLink("Counters", navigateToCounters), ' page, or adjust Settings ', TextLink('here', navigateToSettings), '.'
)

export const Counters = (
  {
    actions: { [module.a]: a, [module.b]: b, [module.c]: c, [module.d]: d, [module.e]: e },
    views: { [module.a]: aViews, [module.b]: bViews, [module.c]: cViews, [module.d]: dViews, [module.e]: eViews, [module.multiCounter]: multiCounter }
  }
) =>
  Div(
    aViews.IncDec({ title: 'Counter A', incrementOther: b.increment, decrementOther: b.decrement }),
    bViews.IncDec({ title: 'Counter B', incrementOther: c.increment, decrementOther: c.decrement }),
    cViews.IncDec({ title: 'Counter C', incrementOther: d.increment, decrementOther: d.decrement }),
    dViews.IncDec({ title: 'Counter D', incrementOther: e.increment, decrementOther: e.decrement }),
    eViews.IncDec({ title: 'Counter E', incrementOther: a.increment, decrementOther: a.decrement }),
    ...multiCounter.Counters()
  )

export const Settings = ({ [module.c]: cViews, [module.e]: eViews, [module.multiCounter]: multiCounter }) =>
  Div(
    cViews.Settings(),
    eViews.Settings(),
    ...multiCounter.Settings()
  )
