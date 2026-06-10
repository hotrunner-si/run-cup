import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import RaceView from '../views/RaceView.vue'
import ResultsView from '../views/ResultsView.vue'
import SponsorsView from '../views/SponsorsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tekma/:slug',
    name: 'race',
    component: RaceView,
    props: true,
  },
  {
    path: '/rezultati',
    name: 'results',
    component: ResultsView,
  },
  {
    path: '/sponzorji',
    name: 'sponsors',
    component: SponsorsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: 'smooth'
      }
    }

    return { top: 0 }
  }
})

export default router