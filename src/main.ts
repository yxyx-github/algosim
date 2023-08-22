import './assets/tailwind.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
// import Tailwind from 'primevue/passthrough/tailwind'

import App from './App.vue'
import router from './router'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(PrimeVue, { unstyled: true, pt: Tailwind })
app.use(PrimeVue)
app.directive('tooltip', Tooltip)

app.mount('#app')
