import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import menu from '@/components/AppMenu/AppMenu.vue'

Vue.config.productionTip = false
Vue.component('app-menu', menu);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
