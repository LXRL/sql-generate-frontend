import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 配置 Router
import router from './router/index'

// 全局样式 Css
import "assets/css/index.css"

createApp(App).use(router).mount('#app')
