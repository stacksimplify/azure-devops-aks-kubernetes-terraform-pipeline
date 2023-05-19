import { Event } from '@irontitan/paradox'
import { Ship } from '../entity'

interface IEventCreationParams {
  reason: string
}

export class ShipDepartedEvent extends Event<IEventCreationParams> {
  static readonly eventName = 'ship-departed'
  readonly user: string

  constructor (data: IEventCreationParams, user: string) {
    super(ShipDepartedEvent.eventName, data)
    this.user = user
  }

  static commit (state: Ship, event: ShipDepartedEvent): Ship {
    state.currentPort = null
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}
