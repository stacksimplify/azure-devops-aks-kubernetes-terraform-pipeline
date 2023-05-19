import { ShipError } from './ShipError'
import { format } from 'util'

const MESSAGE = 'Ship with ID "%s" was not found'

export class ShipNotFoundError extends ShipError {
  constructor (id: string) {
    super(format(MESSAGE, id))
  }
}
