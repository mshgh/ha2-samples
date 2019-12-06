import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { BorderedModule } from '../../components/module-helpers.js'

const CounterName = name => name && h('div', {}, 'Name: ', name)
const BulletedList = (...items) => items.length > 0 && h('ul', {}, items.map(i => h('li', {}, i)))
const Checkbox = (label, checked, onclick) => [label, h('input', { type: 'checkbox', checked, onclick })]

export const Settings = ({ name, checked: allowNegative, toggle }) =>
  BorderedModule('Counter (Settings)',
    CounterName(name),
    BulletedList(
      Checkbox('Allow negative values: ', allowNegative, toggle)
    )
  )
