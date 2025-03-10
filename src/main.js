import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(VueKonva)
app.mount('#app')
