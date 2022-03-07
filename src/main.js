import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import menu from '@/components/AppMenu/AppMenu.vue'

Vue.config.productionTip = false;
/* Global Variables */
Vue.component('app-menu', menu);
Vue.prototype.$appName = 'Aspire';
Vue.prototype.$_publicPath = (process.env.NODE_ENV === 'production' ? '/aspire/' : '/');
/* End of Global Variables */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
