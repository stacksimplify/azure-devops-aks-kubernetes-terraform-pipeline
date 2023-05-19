import { ObjectId } from 'mongodb'
import { Port, Ship } from '../domain'
import { PortRepository } from '../data/repositories/PortRepository'
import { PortNotFoundError } from '../domain/port/errors/PortNotFoundError'
import { IPortCreationParams } from '../domain/structures/IPortCreationParams'

export class PortService {
  private readonly repository: PortRepository

  constructor (repository: PortRepository) {
    this.repository = repository
  }

  async create (params: IPortCreationParams, user: string): Promise<Port> {
    const port = Port.create(params, user)

    return this.repository.save(port)
  }

  async undockShip (ship: Ship, reason: string, user: string): Promise<void> {
    if (!ship.currentPort) return

    const port = await this.repository.findById(ship.currentPort)
    if (!port) return
    if (!port.dockedShips.find((dockedShip) => dockedShip.equals(ship.id as ObjectId))) return

    port.undockShip(ship, reason, user)

    await this.repository.save(port)
  }

  async dockShip (ship: Ship, user: string): Promise<void> {
    if (!ship.currentPort) return

    const port = await this.repository.findById(ship.currentPort)

    if (!port) throw new PortNotFoundError(ship.currentPort.toHexString())
    if (port.dockedShips.find((dockedShip) => dockedShip.equals(ship.id as ObjectId))) return

    port.dockShip(ship, user)
    await this.repository.save(port)
  }

  async delete (portId: string, user: string): Promise<Port> {
    const port = await this.repository.findById(portId)

    if (!port) throw new PortNotFoundError(portId)

    port.delete(user)

    return this.repository.save(port)
  }

  async find (id: ObjectId | string): Promise<Port> {
    const port = await this.repository.findById(id)

    if (!port) throw new PortNotFoundError(id as string)

    return port
  }

  async getAll (): Promise<Port[]> {
    return this.repository.getAll()
  }
}
