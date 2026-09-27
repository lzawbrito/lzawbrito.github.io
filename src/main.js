import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(VueKonva)
// Wait for the initial route to resolve so the main layout doesn't flash
// before the landing page (App.vue branches on $route.meta.home)
router.isReady().then(() => app.mount('#app'))
