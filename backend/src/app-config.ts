import env from 'sugar-env'

export const config = {
  cors: {
    exposedHeaders: ['x-content-range']
  },
  database: {
    mongodb: {
      uri: env.get('DATABASE_MONGODB_URI'),
      dbName: env.get('DATABASE_MONGODB_DBNAME')
    }
  }
}
