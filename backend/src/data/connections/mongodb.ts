import { MongoClient, Db } from 'mongodb'
import IMongoParams from '../structures/IMongoParams'

/**
 * MongoClient default settings
 */
const defaults = {
  poolSize: 10,
  useNewUrlParser: true
}

/**
 * Connect to a MongoDB database
 *
 * @param {Object} mongoData Data to connect to the database
 * @param {string} mongoData.uri Host IP or mongodb:// URL to connect
 * @param {string} mongoData.dbname Database name
 * @param {MongoClientOptions} mongoData.options Options to be proxied to the database
 */
async function connect ({ uri, dbName, options = {} }: IMongoParams) {
  const client = await MongoClient.connect(uri, { ...defaults, ...options })
  return client.db(dbName)
}

/**
 * Creates a mongoDB Connection
 *
 * @param databaseEnvs {Object} Environment variables for database
 * @param databaseEnvs.mongodb {IMongoParams} Environment variables for mongoDB
 */
async function createConnection (config: IMongoParams): Promise<Db> {
  return connect(config)
}

export default { createConnection }
