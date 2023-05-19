const { Ship } = require('./dist/domain/ship/entity')
const { ShipRepository } = require('./dist/data/repositories/ShipRepository')
const { Port } = require('./dist/domain/port/entity')
const { PortRepository } = require('./dist/data/repositories/PortRepository')

module.exports = {
  mongodb: {
    uri: process.env.DATABASE_MONGODB_URI,
    dbName: process.env.DATABASE_MONGODB_DBNAME
  },
  entities: {
    ship: {
      entity: Ship,
      collection: 'ships',
      repository: (mongodbConnection) => new ShipRepository(mongodbConnection)
    },
    port: {
      entity: Port,
      collection: 'ports',
      repository: (mongodbConnection) => new PortRepository(mongodbConnection)
    }
  }
}
