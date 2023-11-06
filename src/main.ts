import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './assets/main.css'

import LandingPage from '@/views/landing-page.vue'
import PokemonListPage from '@/views/pokemon-list.vue'

library.add(faArrowLeft)

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: LandingPage },
  { path: '/pokemon-list', component: PokemonListPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
