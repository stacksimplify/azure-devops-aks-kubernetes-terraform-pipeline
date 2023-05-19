import rescue from 'express-rescue'
import { HttpError } from '@expresso/expresso'
import { PortService } from '../../../services/PortService'
import { PortNotFoundError } from '../../../domain/port/errors/PortNotFoundError'

export function factory (service: PortService) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const port = await service.find(req.params.portId)

      res.status(200).json(port.state)
    }),
    (err, _req, _res, next) => {
      if (err instanceof PortNotFoundError) return next(new HttpError.NotFound({ message: err.message, code: 'port_not_found' }))

      next(err)
    }
  ]
}
