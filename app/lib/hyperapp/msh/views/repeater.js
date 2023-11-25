import { Init, arrayLenCheck, swapArrayItems } from '../../../../lib/hyperapp/msh/action-helpers.js'

// actions
const InsertItem = (state, { index, ...item }) => arrayLenCheck(state, al => index <= al, () => [...state.slice(0, index), item, ...state.slice(index)])
const DeleteItem = (state, { index }) => arrayLenCheck(state, al => index < al, () => state.filter((_, idx) => index !== idx))
const MoveItemUp = (state, { index }) => arrayLenCheck(state, al => index < (al - 1), () => swapArrayItems(state, index, index + 1))
const MoveItemDown = (state, { index }) => arrayLenCheck(state, al => al > 1 && index < al, () => swapArrayItems(state, index - 1, index))

// views

// build
export const repeaterSetup = itemSetup => [
  ['Actions', [Init, InsertItem, DeleteItem, MoveItemUp, MoveItemDown]],
  ['Include', itemSetup, { namespace: 'item', focus: '@index' }]
]
