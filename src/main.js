import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import { createPinia, PiniaVuePlugin } from 'pinia'
// import VueCompositionAPI from '@vue/composition-api'
import router from './router'

Vue.use(PiniaVuePlugin)
Vue.use(VueRouter)
const pinia = createPinia()
// Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  vuetify,
  pinia,
  router,
  render: h => h(App)
}).$mount('#app')
