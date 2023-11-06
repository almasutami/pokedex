import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faSearch, faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import './assets/main.css'

import router from './router'

library.add(faArrowLeft, faSearch, faMars, faVenus)

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
