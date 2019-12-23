import { Div, TextLink, ButtonLink, Separator, FormTitle, InputText, InputCheckbox, ButtonLinkDisabled } from './components/helpers.js'
import { indexes as module } from './app-modules.js'
import * as addCounter from './app-actions-add-counter.js'

export function WelcomeMessage({ navigateToCounters, navigateToSettings }) {
  return Div(
    'Welcome to our weird Counter App. You can use the top level navigation or jump directly into ', TextLink("Counters", navigateToCounters), ' page, or adjust Settings ', TextLink('here', navigateToSettings), '.'
  )
}

export function Counters({
  actions: { [module.a]: a, [module.b]: b, [module.c]: c, [module.d]: d, [module.e]: e },
  views: { [module.a]: aViews, [module.b]: bViews, [module.c]: cViews, [module.d]: dViews, [module.e]: eViews, [module.multiCounter]: multiCounterViews }
}) {
  return Div(
    ...multiCounterViews.Counters(),
    Separator(),
    aViews.IncDec({ title: 'Counter A', incrementOther: b.increment, decrementOther: b.decrement }),
    bViews.IncDec({ title: 'Counter B', incrementOther: c.increment, decrementOther: c.decrement }),
    cViews.IncDec({ title: 'Counter C', incrementOther: d.increment, decrementOther: d.decrement }),
    dViews.IncDec({ title: 'Counter D', incrementOther: e.increment, decrementOther: e.decrement }),
    eViews.IncDec({ title: 'Counter E', incrementOther: a.increment, decrementOther: a.decrement })
  )
}

export function Settings({ [module.c]: cViews, [module.e]: eViews, [module.multiCounter]: multiCounterViews }) {
  return Div(
    ...multiCounterViews.Settings(),
    Separator(),
    cViews.Settings(),
    eViews.Settings()
  )
}

export function AddMoreForm({ addCounter: { name, count, positive }, add }) {
  return Div(
    FormTitle('Counter parameters'),
    Div('Name: ', InputText(name, addCounter.oninputName), ' (required)'),
    Div('Count: ', InputText(count, addCounter.oninputCount)),
    Div('Use PositiveCounter: ', InputCheckbox(positive, addCounter.oninputPositive)),
    Div('\u00A0'),
    name.length > 0
      ? ButtonLink('Add counter', [add, { name, count, positive: positive ? false : undefined }])
      : ButtonLinkDisabled('Add counter')
  )
}
