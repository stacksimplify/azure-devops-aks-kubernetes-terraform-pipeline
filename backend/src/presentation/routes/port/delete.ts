import rescue from 'express-rescue'
import { HttpError } from '@expresso/expresso'
import { ShipService } from '../../../services/ShipService'
import { ShipNotFoundError } from '../../../domain/ship/errors/ShipNotFoundError'
import { PortService } from '../../../services/PortService'

export function factory (service: PortService, shipService: ShipService) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const port = await service.delete(req.params.portId, req.onBehalfOf)

      for (const shipId of port.dockedShips) {
        await shipService.depart(shipId, 'Port was deleted', req.onBehalfOf)
      }

      res.status(204).end()
    }),
    (err, _req, _res, next) => {
      if (err instanceof ShipNotFoundError) return next(new HttpError.NotFound({ message: err.message, code: 'ship_not_found' }))

      next(err)
    }
  ]
}
