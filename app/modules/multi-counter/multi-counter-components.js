import { FloatLeft, ButtonDelete } from '../../components/helpers.js'

export function Counters({ counters = [], del }) {
  return counters.map((c, idx) => FloatLeft([
    c.IncDec({
      incrementOther: counters[wrap(idx + 1)].increment,
      incrementOtherLabel: 'next',
      decrementOther: counters[wrap(idx - 1)].decrement,
      decrementOtherLabel: 'prev'
    }),
    ButtonDelete([del, idx])
  ]))

  function wrap(idx) {
    return idx < 0 ? counters.length - 1 : idx >= counters.length ? 0 : idx
  }
}

export function Settings({ counters = [] }) {
  return counters.map(c => c.Settings())
}
