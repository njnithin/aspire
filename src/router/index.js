import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/pages/Home/Home.vue'
import PaymentsView from '@/pages/Payments/Payements.vue'
import CreditView from '@/pages/Credit/Credit.vue'
import SettingsView from '@/pages/Settings/Settings.vue'
import CardView from '@/pages/UserCards/UserCards.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'card',
    component: CardView
  },
  {
    path: '/payments',
    name: 'payments',
    component: PaymentsView
  },
  {
    path: '/credit',
    name: 'credit',
    component: CreditView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
