
import rescue from 'express-rescue'
import { PortService } from '../../../services/PortService'

export function factory (service: PortService) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (_req, res) => {
      const ports = await service.getAll()

      res.status(200).json(ports.map(({ state }) => state))
    })
  ]
}
