import { module, ns } from '../../../lib/modules.js'
import Counter from '../counter/index.js'
import PositiveCounter from '../positive-counter/index.js'
import { WithDeleteButton } from './multi-counter-components.js'

export default function MultiCounter(slice, { } = {}) {

  const modules = []

  function isPositiveCounter({ positive } = {}) {
    return positive !== undefined
  }

  function getModule(props) {
    return isPositiveCounter(props) ? PositiveCounter : Counter
  }

  function add(slice, props) {
    const seq = slice.seq + 1
    const id = `x${seq}`
    const module = getModule(props)(child(id), props)

    modules.push(module)

    return {
      ...slice,
      seq,
      order: [...slice.order, { id, props }],
      [id]: module.init[id]
    }
  }

  function del(slice, idx) {
    const { [slice.order[idx].id]: _, ...result } = slice
    modules.splice(idx, 1)
    return {
      ...result,
      order: slice.order.filter((_, i) => idx !== i)
    }
  }

  const [multiCounter, child] = module(slice, {
    init: {
      seq: -1,
      order: []
    },
    actions: {
      add,
      del
    },
    views({ slice, actions: { del }, state }) {
      return {
        Counters() {
          return views().map((v, idx) => WithDeleteButton(
            {
              Module: v.IncDec({
                incrementOther: modules[wrapIndex(idx + 1)].actions.increment,
                decrementOther: modules[wrapIndex(idx + 1)].actions.decrement
              }),
              onDelete: [del, idx]
            }))
        },
        Settings() {
          return views(positiveCounters).map(v => v.Settings())
        }
      }

      function views(filter = _ => true) {
        return modules.filter(filter).map(m => m.views(state))
      }

      function wrapIndex(index) {
        return index < 0 ? modules.length - 1 : index >= modules.length ? 0 : index
      }

      function positiveCounters(_, idx) {
        return isPositiveCounter(slice.order[idx].props)
      }
    }
  })

  return {
    init: multiCounter.init,
    actions: multiCounter.actions,
    views(state) {
      return multiCounter.views(state)
    },
    add(props) {
      // too simplistic - slice cannot be 'child'; only string is supported this way
      multiCounter.init[slice] = add(multiCounter.init[slice], props)
    }
  }
}
