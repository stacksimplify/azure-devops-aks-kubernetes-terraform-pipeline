export default {
  ship: {
    create: require('./ship/create'),
    delete: require('./ship/delete'),
    find: require('./ship/find'),
    getAll: require('./ship/getAll'),
    dock: require('./ship/dock'),
    depart: require('./ship/depart'),
    getEvents: require('./ship/getEvents')
  },
  port: {
    create: require('./port/create'),
    delete: require('./port/delete'),
    find: require('./port/find'),
    getAll: require('./port/getAll'),
    getEvents: require('./port/getEvents')
  }
}
