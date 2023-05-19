import { Db } from 'mongodb'
import { MongodbEventRepository } from '@irontitan/paradox'
import { Ship } from '../../domain/ship/entity'

export class ShipRepository extends MongodbEventRepository<Ship> {
  constructor (connection: Db) {
    super(connection.collection(Ship.collection), Ship)
  }

  async getAll (): Promise<Ship[]> {
    const documents = await this._collection.find({ 'state.deletedAt': null }).toArray()

    return documents.map(({ events }) => {
      const ship = new Ship()
      ship.setPersistedEvents(events)
      return ship
    })
  }
}
