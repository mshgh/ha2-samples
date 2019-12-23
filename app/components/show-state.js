import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'

const functionPlaceholder = '>>>FUNCTION-MARKER(){}<<<'

const showState = state => ({ ...state, showState: !state.showState })
const showFunctions = (_, value) => typeof value === 'function' ? functionPlaceholder : value

export const ShowState = ({ state, indent = 2 }) => h('pre', {}, h('code', {}, [
  'State: ',
  h('span', { style: { cursor: 'pointer', 'border-bottom': '1px solid black' }, onclick: showState }, `${state.showState ? 'Hide' : 'Show'}`),
  state.showState && h('div', {}, JSON.stringify(state, showFunctions, indent).split(`: "${functionPlaceholder}"`).join(': function () => {...}'))
]))
