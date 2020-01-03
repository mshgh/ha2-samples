import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'
import { BorderedModule } from '../../components/helpers.js'

const Button = (label, onclick) => h('button', { onclick }, label)
const ShowCount = count => h('span', { style: { 'width': '2.5em', 'text-align': 'center', 'display': 'inline-block' } }, count)

export const IncDec = ({ name, count, increment, decrement, incrementOther, incrementOtherLabel = 'other', decrementOther, decrementOtherLabel = 'other' }) =>
  BorderedModule('Counter', name,
    decrementOther && ['[', Button(`(${decrementOtherLabel}) - `, decrementOther), '] '],
    Button(' - ', decrement),
    ShowCount(count),
    Button(' + ', increment),
    incrementOther && [' [', Button(` + (${incrementOtherLabel})`, incrementOther), ']']
  )
