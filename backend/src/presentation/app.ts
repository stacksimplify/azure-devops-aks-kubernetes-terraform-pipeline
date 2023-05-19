import routes from './routes'
import { Express } from 'express'
import expresso from '@expresso/expresso'
import { ShipService } from '../services/ShipService'
import { ShipRepository } from '../data/repositories/ShipRepository'
import mongodb from '../data/connections/mongodb'
import { PortRepository } from '../data/repositories/PortRepository'
import { PortService } from '../services/PortService'

export const app = expresso(async (app: Express, config: any) => {
  const connection = await mongodb.createConnection(config.database.mongodb)

  const portRepository = new PortRepository(connection)
  const portService = new PortService(portRepository)

  const shipRepository = new ShipRepository(connection)
  const shipService = new ShipService(shipRepository, portService)

  app.post('/ships', routes.ship.create.factory(shipService, portService))
  app.delete('/ships/:shipId', routes.ship.delete.factory(shipService, portService))
  app.get('/ships/:shipId', routes.ship.find.factory(shipService))
  app.get('/ships', routes.ship.getAll.factory(shipService))
  app.get('/ships/:shipId/events', routes.ship.getEvents.factory(shipService))
  app.put('/ships/:shipId/dock/:portId', routes.ship.dock.factory(shipService))
  app.put('/ships/:shipId/depart', routes.ship.depart.factory(shipService))

  app.post('/ports', routes.port.create.factory(portService))
  app.delete('/ports/:portId', routes.port.delete.factory(portService, shipService))
  app.get('/ports/:portId', routes.port.find.factory(portService))
  app.get('/ports/:portId/events', routes.port.getEvents.factory(portService))
  app.get('/ports/', routes.port.getAll.factory(portService))
})
