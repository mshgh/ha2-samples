import { module, ns } from '../../../lib/modules.js'
import Counter from '../counter/index.js'
import PositiveCounter from '../positive-counter/index.js'
import { WithDeleteButton } from './multi-counter-components.js'

export default function MultiCounter(slice, { } = {}) {

  const counters = []
  let seq = -1

  function insert(at, Module, type, props) {
    const id = `m${++seq}`
    const module = ns(child(id)).add(Module, 'module', props)

    module.init.type = type
    module.init.props = props
    counters.splice(at, 0, { id, module })

    return { [id]: module.init }
  }

  function addCounter(props) {
    return props.positive === undefined
      ? insert(counters.length, Counter, 'counter', props)
      : insert(counters.length, PositiveCounter, 'positiveCounter', props)
  }

  const [multiCounter, child] = module(slice, {
    actions: {
      add(slice, props) {
        return {
          ...slice,
          ...addCounter(props)
        }
      },
      del(slice, idx) {
        const { [counters[idx].id]: _, ...result } = slice
        counters.splice(idx, 1)
        return result
      }
    },
    views({ slice, actions: { del }, state }) {
      return {
        Counters() {
          return views().map((v, idx) => WithDeleteButton(
            {
              Module: v.IncDec({
                incrementOther: counters[wrapIndex(idx + 1)].module.actions.increment,
                decrementOther: counters[wrapIndex(idx + 1)].module.actions.decrement
              }),
              onDelete: [del, idx]
            }))
        },
        Settings() {
          return views(positiveCounter).map(v => v.Settings())
        }
      }

      function views(filter = _ => true) {
        return counters.filter(filter).map(c => c.module.views(state))
      }

      function wrapIndex(index) {
        return index < 0 ? counters.length - 1 : index >= counters.length ? 0 : index
      }

      function positiveCounter(module) {
        return slice[module.id].type === 'positiveCounter'
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
      addCounter(props)
    }
  }
}
