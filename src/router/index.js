import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/pages/Home/Home.vue'
import CardView from '@/pages/UserCards/UserCards.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/aspire/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/aspire',
    name: 'card',
    component: CardView
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
