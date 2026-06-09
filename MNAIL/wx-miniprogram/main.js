import { createSSRApp } from 'vue'
import App from './App.vue'
import request from './utils/request.js'
import i18n from './lang/index.js'
import { createPinia } from 'pinia'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()

  app.config.globalProperties.$request = request
  app.use(pinia)
  app.use(i18n)

  return {
    app,
    pinia
  }
}