import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { BorderedModule } from '../../components/helpers.js'

const BulletedList = (...items) => items.length > 0 && h('ul', {}, items.map(i => h('li', {}, i)))
const Checkbox = (label, checked, onclick) => [label, h('input', { type: 'checkbox', checked, onclick })]

export const Settings = ({ name, checked: allowNegative, toggle }) =>
  BorderedModule('Counter (Settings)', name,
    BulletedList(
      Checkbox('Allow negative values: ', allowNegative, toggle)
    )
  )
