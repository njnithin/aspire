import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/pages/Home/Home.vue'
import CardView from '@/pages/UserCards/UserCards.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/card',
    name: 'card',
    component: CardView
  }
]

const router = new VueRouter({
  routes
})

export default router
