import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { BorderedModule } from '../../components/module-helpers.js'

const CounterName = name => name && h('div', {}, 'Name: ', name)
const Button = (label, onclick) => h('button', { onclick }, label)
const ShowCount = count => ' ' + count + ' '

export const IncDec = ({ name, count, increment, decrement, incrementOther, decrementOther }) =>
  BorderedModule('Counter',
    CounterName(name),
    decrementOther && ['[', Button('(other) - ', decrementOther), '] '],
    Button(' - ', decrement),
    ShowCount(count),
    Button(' + ', increment),
    incrementOther && [' [', Button(' + (other)', incrementOther), ']'],
  )
