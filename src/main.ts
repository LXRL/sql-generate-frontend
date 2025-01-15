import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 配置 Router
import router from './router/index'
// 全局样式 Css
import "assets/css/index.css"
// 配置 Pinia
import pinia from './store/index'
// 配置 type
import "@/types/index"
// 配置 codemirror 编译器
import VueCodemirror from "vue-codemirror";
import "@codemirror/theme-one-dark"


createApp(App).use(router).use(pinia).use(VueCodemirror).mount('#app')
