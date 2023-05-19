import { Event } from '@irontitan/paradox'
import { Ship } from '../entity'

export class ShipWasDeletedEvent extends Event<{}> {
  static readonly eventName = 'ship-was-deleted'
  readonly user: string

  constructor (user: string) {
    super(ShipWasDeletedEvent.eventName, {})
    this.user = user
  }

  static commit (state: Ship, event: ShipWasDeletedEvent): Ship {
    state.deletedAt = event.timestamp
    state.deletedBy = event.user
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}
