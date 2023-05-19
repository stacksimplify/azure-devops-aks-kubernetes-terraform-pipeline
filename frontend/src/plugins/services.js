import services from '../services'

function install (Vue) {
  Object.defineProperty(Vue.prototype, '$services', {
    get () { return services }
  })
}

export default { install }
