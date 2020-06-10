import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import EvaIcons from 'vue-eva-icons'
import VueTippy, { TippyComponent } from 'vue-tippy'
import Notifications from 'vue-notification'

Vue.use(EvaIcons)
Vue.use(VueTippy, {
  arrow: true,
  arrowType: 'round'
})
Vue.use(Notifications)

Vue.component('tippy', TippyComponent);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
