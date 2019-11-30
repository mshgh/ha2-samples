import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'

const moduleBorder = { border: '1px solid black', width: 'fit-content', padding: '4px', margin: '6px' }
const underlineHeader = { 'border-bottom': '1px solid black' }

export const IncDec = ({ title, count, increment, decrement, incrementOther, decrementOther }) =>
  h('div', { style: moduleBorder }, [
    title && h('div', {}, h('div', { style: underlineHeader }, 'Module'), ['Title: ', title]),
    decrementOther && ['[', h('button', { onClick: decrementOther }, '(other) - '), '] '],
    h('button', { onclick: decrement }, ' - '),
    '' + count,
    h('button', { onclick: increment }, ' + '),
    incrementOther && [' [', h('button', { onClick: incrementOther }, ' + (other)'), ']'],
  ])
