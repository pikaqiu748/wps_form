import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 阿里icon左右箭头
import '@/assets/icon/iconfont.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/style/global.css'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
// 注册全局element-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia).use(router).use(ElementPlus).mount('#app')

