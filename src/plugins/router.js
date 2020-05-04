import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "general" */ '@/views/_Home.vue')
    },
    {
      path: '/studio',
      name: 'studio',
      component: () => import(/* webpackChunkName: "studio" */ '@/views/studio/_Studio.vue')
    }
  ]
})
