
import rescue from 'express-rescue'
import { ShipService } from '../../../services/ShipService'

export function factory (service: ShipService) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (_req, res) => {
      const ships = await service.getAll()

      res.status(200).json(ships.map(({ state }) => state))
    })
  ]
}
