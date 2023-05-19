import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import services from './plugins/services'
import VueFilterDateFormat from 'vue-filter-date-format'

Vue.config.productionTip = false

Vue.use(VueFilterDateFormat)
Vue.use(services)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
