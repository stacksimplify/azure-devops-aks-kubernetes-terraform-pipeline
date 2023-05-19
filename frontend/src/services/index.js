import axios from 'axios'
import { ShipService } from './ships'
import { PortService } from './ports'

const http = axios.create({
  baseURL: config.VUE_APP_BACKEND_BASE_URL || process.env.VUE_APP_BACKEND_BASE_URL,
  headers: {
    'X-On-Behalf-Of': 'Ship-Manager'
  }
})

export default {
  ship: new ShipService(http),
  port: new PortService(http)
}
