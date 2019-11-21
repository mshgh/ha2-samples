import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'

export const ShowState = ({ state, indent = 2 }) => h('pre', {}, h('code', {}, JSON.stringify(state, null, indent)))
