import { ObjectId } from 'mongodb'
import { Ship } from '../domain'
import { ShipRepository } from '../data/repositories/ShipRepository'
import { ShipNotFoundError } from '../domain/ship/errors/ShipNotFoundError'
import { IShipCreationParams } from '../domain/structures/IShipCreationParams'
import { PortService } from './PortService'

export class ShipService {
  private readonly repository: ShipRepository
  private readonly portService: PortService

  constructor (repository: ShipRepository, portService: PortService) {
    this.repository = repository
    this.portService = portService
  }

  async create (creationParams: IShipCreationParams, user: string): Promise<Ship> {
    const ship = Ship.create(creationParams, user)

    return this.repository.save(ship)
  }

  async delete (shipId: string, user: string): Promise<Ship> {
    const ship = await this.repository.findById(shipId)
    if (!ship) throw new ShipNotFoundError(shipId)

    ship.delete(user)
    return this.repository.save(ship)
  }

  async depart (shipId: ObjectId | string, reason: string, user: string): Promise<Ship> {
    const obj = new ObjectId(shipId)
    const ship = await this.repository.findById(obj)

    if (!ship) throw new ShipNotFoundError(obj.toHexString())
    if (!ship.currentPort) return ship

    await this.portService.undockShip(ship, reason, user)

    ship.depart(reason, user)
    return this.repository.save(ship)
  }

  async dock (shipId: string, portId: string, user: string): Promise<Ship> {
    const ship = await this.repository.findById(shipId)

    if (!ship) throw new ShipNotFoundError(shipId)
    if (ship.currentPort && ship.currentPort.toHexString() === portId) return ship

    const port = await this.portService.find(portId)
    ship.dock(port, user)

    await this.portService.dockShip(ship, user)
    return this.repository.save(ship)
  }

  async find (id: ObjectId | string): Promise<Ship> {
    const ship = await this.repository.findById(id)

    if (!ship) throw new ShipNotFoundError(id as string)

    return ship
  }

  async getAll (): Promise<Ship[]> {
    return this.repository.getAll()
  }
}
