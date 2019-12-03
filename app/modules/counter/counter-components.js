import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'

const moduleBorder = { border: '1px solid black', width: 'fit-content', padding: '4px', margin: '6px' }
const underlineHeader = { 'border-bottom': '1px solid black', 'margin-bottom': '4px' }

export const IncDec = ({ name, count, increment, decrement, incrementOther, decrementOther }) =>
  h('div', { style: moduleBorder }, [
    h('div', {}, [h('div', { style: underlineHeader }, 'Module: Counter'), name && ['Name: ', name]]),
    decrementOther && ['[', h('button', { onClick: decrementOther }, '(other) - '), '] '],
    h('button', { onclick: decrement }, ' - '),
    ' ' + count + ' ',
    h('button', { onclick: increment }, ' + '),
    incrementOther && [' [', h('button', { onClick: incrementOther }, ' + (other)'), ']'],
  ])
