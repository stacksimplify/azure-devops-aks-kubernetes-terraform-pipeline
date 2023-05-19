import { server } from '@expresso/expresso'

import { app } from './app'
import { config } from '../app-config'

export function start () {
  server.start(app, config)
}
