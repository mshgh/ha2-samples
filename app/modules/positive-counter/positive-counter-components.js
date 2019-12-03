import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'

const moduleBorder = { border: '1px solid black', width: 'fit-content', padding: '4px', margin: '6px' }
const underlineHeader = { 'border-bottom': '1px solid black', 'margin-bottom': '4px' }

export const Settings = ({ name, checked, toggle }) => h('div', { style: moduleBorder }, [
  name && h('div', {}, h('div', { style: underlineHeader }, 'Module: Counter (Settings)'), ['Name: ', name]),
  '* Allow negative values: ',
  h('input', { type: 'checkbox', checked, onclick: toggle }),
])
