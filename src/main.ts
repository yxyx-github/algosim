import './assets/tailwind.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
// import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
// import Tailwind from 'primevue/passthrough/tailwind'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(PrimeVue, { unstyled: true, pt: Tailwind })
app.use(PrimeVue)

app.mount('#app')
