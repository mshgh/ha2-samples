import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'

const underlineHTitle = { 'border-bottom': '1px solid black' }

export const ShowState = ({ state, indent = 2 }) => h('pre', {}, h('code', { style: underlineHTitle }, 'State', h('div', {}, JSON.stringify(state, null, indent))))
