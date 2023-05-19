export class PortService {
  constructor (http) {
    this._http = http
  }

  async getAll () {
    return this._http.get('/ports')
  }

  async getOne (id) {
    return this._http.get(`/ports/${id}`)
  }

  async delete (id) {
    return this._http.delete(`/ports/${id}`)
  }

  async getEvents (id) {
    return this._http.get(`/ports/${id}/events`)
  }

  async create (params) {
    return this._http.post('/ports', params)
  }
}
