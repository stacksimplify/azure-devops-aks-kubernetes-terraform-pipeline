import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ships/new',
      name: 'newShip',
      component: () => import(/* webpackChunkName: "newShip" */ './views/NewShip.vue')
    },
    {
      path: '/ships/',
      name: 'shipSelection',
      component: () => import(/* webpackChunkName: "shipSelection" */ './views/ShipSelection.vue')
    },
    {
      path: '/ships/:id',
      name: 'shipInfo',
      component: () => import(/* webpackChunkName: "shipInfo" */ './views/ShipInfo.vue')
    },
    {
      path: '/ports/new',
      name: 'newPort',
      component: () => import(/* webpackChunkName: "newPort" */ './views/NewPort.vue')
    },
    {
      path: '/ports/',
      name: 'portSelection',
      component: () => import(/* webpackChunkName: "portSelection" */ './views/PortSelection.vue')
    },
    {
      path: '/ports/:id',
      name: 'portInfo',
      component: () => import(/* webpackChunkName: "portInfo" */ './views/PortInfo.vue')
    }
  ]
})
