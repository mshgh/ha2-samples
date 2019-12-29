import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'

const functionPlaceholder = '>>>FUNCTION-MARKER(){}<<<'

const showState = state => ({ ...state, showState: !state.showState })
const showFunctions = (_, value) => typeof value === 'function' ? functionPlaceholder : value
const showScrollbar = height => height === undefined ? {} : { style: { height, overflow: 'auto' } }

export const ShowState = ({ state, height, indent = 2 }) => h('pre', {}, h('code', {}, [
  'State: ',
  h('span', { style: { cursor: 'pointer', 'border-bottom': '1px solid black' }, onclick: showState }, `${state.showState ? 'Hide' : 'Show'}`),
  state.showState && h('div', showScrollbar(height), JSON.stringify(state, showFunctions, indent).split(`: "${functionPlaceholder}"`).join(': function () => {...}'))
]))
