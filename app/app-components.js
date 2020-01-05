import { Div, TextLink, ButtonLink, Separator, FormTitle, InputText, InputCheckbox, ButtonLinkDisabled } from './components/helpers.js'
import { indexes as module } from './app-modules.js'
import * as addCounter from './app-actions-add-counter.js'

export function WelcomeMessage({ navigation }) {
  return Div(
    'Welcome to our weird Counter App. You can use the top level navigation or jump directly into ', TextLink("Counters", navigation.Counters), ' page,',
    ' adjust ', TextLink('Settings', navigation.Settings), ',',
    ' or ', TextLink('Add more', navigation.AddMore), ' counters.'
  )
}

export function Counters({
  actions: { [module.a]: a, [module.b]: b, [module.c]: c, [module.d]: d, [module.e]: e },
  views: { [module.a]: aViews, [module.b]: bViews, [module.c]: cViews, [module.d]: dViews, [module.e]: eViews, [module.multiCounter]: multiCounterViews }
}) {
  return Div(
    ...multiCounterViews.Counters(),
    Separator(),
    IncDec(aViews, 'Counter A', b),
    IncDec(bViews, 'Counter B', c),
    IncDec(cViews, 'Counter C', d),
    IncDec(dViews, 'Counter D', e),
    IncDec(eViews, 'Counter E', a)
  )

  function IncDec(views, title, { increment, decrement }) {
    return views.IncDec({
      title,
      incrementOther: increment, incrementOtherLabel: 'next',
      decrementOther: decrement, decrementOtherLabel: 'next'
    })
  }
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
