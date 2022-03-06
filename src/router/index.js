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
    path: '/cards',
    name: 'card',
    component: CardView
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
