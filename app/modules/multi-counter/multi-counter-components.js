import { FloatLeft, ButtonDelete } from '../../components/helpers.js'

export function WithDeleteButton({ Module, onDelete }) {
  return FloatLeft([Module, ButtonDelete(onDelete)])
}
