export class ShipService {
  constructor (http) {
    this._http = http
  }

  async getAll () {
    return this._http.get('/ships')
  }

  async getOne (id) {
    return this._http.get(`/ships/${id}`)
  }

  async delete (id) {
    return this._http.delete(`/ships/${id}`)
  }

  async depart (id) {
    return this._http.put(`/ships/${id}/depart`)
  }

  async dock (id, portId) {
    return this._http.put(`/ships/${id}/dock/${portId}`)
  }

  async getEvents (id) {
    return this._http.get(`/ships/${id}/events`)
  }

  async create (params) {
    return this._http.post('/ships', params)
  }
}
