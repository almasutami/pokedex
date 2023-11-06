import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LandingPage from '@/views/landing-page.vue'
import PokemonListPage from '@/views/pokemon-list.vue'
import PokemonDetailsPage from '@/views/pokemon-details.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: LandingPage },
  { path: '/pokemon', component: PokemonListPage },
  {
    path: '/pokemon/:id',
    name: 'pokemon-details',
    component: PokemonDetailsPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
