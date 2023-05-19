import { PortError } from './PortError'
import { format } from 'util'

const MESSAGE = 'Port with ID "%s" was not found'

export class PortNotFoundError extends PortError {
  constructor (id: string) {
    super(format(MESSAGE, id))
  }
}
