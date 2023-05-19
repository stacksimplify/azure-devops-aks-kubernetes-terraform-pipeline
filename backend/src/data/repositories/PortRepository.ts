import { Db } from 'mongodb'
import { MongodbEventRepository } from '@irontitan/paradox'
import { Port } from '../../domain/port/entity'

export class PortRepository extends MongodbEventRepository<Port> {
  constructor (connection: Db) {
    super(connection.collection(Port.collection), Port)
  }

  async getAll (): Promise<Port[]> {
    const documents = await this._collection.find({ 'state.deletedAt': null }).toArray()
    return documents.map(({ events }) => {
      const port = new Port()
      return port.setPersistedEvents(events)
    })
  }
}
