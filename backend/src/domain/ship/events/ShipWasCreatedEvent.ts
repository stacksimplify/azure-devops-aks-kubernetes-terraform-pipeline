import { Event } from '@irontitan/paradox'
import { ObjectId } from 'mongodb'
import { Ship } from '../entity'
import { IShipCreationParams } from '../../structures/IShipCreationParams'

interface IEventCreationParams extends IShipCreationParams {
  id: ObjectId
}

export class ShipWasCreatedEvent extends Event<IEventCreationParams> {
  static readonly eventName = 'ship-was-created'
  readonly user: string

  constructor (data: IEventCreationParams, user: string) {
    super(ShipWasCreatedEvent.eventName, data)
    this.user = user
  }

  static commit (state: Ship, event: ShipWasCreatedEvent): Ship {
    state.id = event.data.id
    state.name = event.data.name
    state.currentPort = new ObjectId(event.data.currentPort)
    state.createdAt = event.timestamp
    state.createdBy = event.user
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}
