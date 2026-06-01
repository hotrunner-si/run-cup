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
})

export default router