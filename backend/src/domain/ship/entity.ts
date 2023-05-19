import { ObjectId } from 'mongodb'
import { EventEntity } from '@irontitan/paradox'
import { ShipWasCreatedEvent } from './events/ShipWasCreatedEvent'
import { IShipCreationParams } from '../structures/IShipCreationParams'
import { ShipWasDeletedEvent } from './events/ShipWasDeletedEvent'
import { ShipDepartedEvent } from './events/ShipDepartedEvent'
import { ShipDockedEvent } from '../ship/events/ShipDockedEvent'
import { Port } from '../port/entity'

export class Ship extends EventEntity<Ship> {
  public id: ObjectId | null = null
  public name: string | null = null
  public currentPort: ObjectId | null = null
  public createdAt: Date | null = null
  public createdBy: string | null = null
  public updatedAt: Date | null = null
  public updatedBy: string | null = null
  public deletedAt: Date | null = null
  public deletedBy: string | null = null

  static readonly collection = 'ships'

  constructor () {
    super({
      [ShipWasCreatedEvent.eventName]: ShipWasCreatedEvent.commit,
      [ShipWasDeletedEvent.eventName]: ShipWasDeletedEvent.commit,
      [ShipDepartedEvent.eventName]: ShipDepartedEvent.commit,
      [ShipDockedEvent.eventName]: ShipDockedEvent.commit
    })
  }

  static create (params: IShipCreationParams, user: string): Ship {
    const ship = new Ship()

    ship.pushNewEvents([
      new ShipWasCreatedEvent({ id: new ObjectId(), ...params }, user)
    ])

    return ship
  }

  delete (user: string): Ship {
    this.pushNewEvents([
      new ShipWasDeletedEvent(user)
    ])

    return this
  }

  depart (reason: string, user: string): Ship {
    this.pushNewEvents([
      new ShipDepartedEvent({ reason }, user)
    ])

    return this
  }

  dock (port: Port, user: string): Ship {
    this.pushNewEvents([
      new ShipDockedEvent({ portId: port.id as ObjectId }, user)
    ])

    return this
  }

  get state () {
    const currentState = this.reducer.reduce(new Ship(), [
      ...this.persistedEvents,
      ...this.pendingEvents
    ])

    return {
      id: currentState.id,
      name: currentState.name,
      currentPort: currentState.currentPort,
      createdAt: currentState.createdAt,
      createdBy: currentState.createdBy,
      updatedAt: currentState.updatedAt,
      updatedBy: currentState.updatedBy,
      deletedAt: currentState.deletedAt,
      deletedBy: currentState.deletedBy
    }
  }
}
