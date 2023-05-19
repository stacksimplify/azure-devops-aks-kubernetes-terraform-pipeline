import { Event } from '@irontitan/paradox'
import { Port } from '../entity'

export class PortWasDeletedEvent extends Event<{}> {
  static readonly eventName = 'port-was-deleted'
  readonly user: string

  constructor (user: string) {
    super(PortWasDeletedEvent.eventName, {})
    this.user = user
  }

  static commit (state: Port, event: PortWasDeletedEvent): Port {
    state.deletedAt = event.timestamp
    state.deletedBy = event.user
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}
