import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ToastPlugin)
app.use(router) 
app.mount('#app')

