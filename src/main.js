import Vue from 'vue'
import App from '@/App.vue'

import router from '@/plugins/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import '@/plugins/meta'
import '@/registerServiceWorker'

import '@/style/index.styl'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
