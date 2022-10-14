import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import router from './router'

Vue.use(PiniaVuePlugin)
Vue.use(VueRouter)
const pinia = createPinia()

Vue.config.productionTip = false

new Vue({
  vuetify,
  pinia,
  router,
  render: h => h(App)
}).$mount('#app')
