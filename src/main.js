import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 导入插件
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// 导入axios，设置默认baseURL
import axios from 'axios'
axios.defaults.baseURL ='http://localhost:2345/api'

// 创建vue实例app
const app = createApp(App)
// 启动我们需要的插件
app.use(router)
app.use(ElementPlus)
// 配置vue启用axios
app.config.globalProperties.$axios = axios
// 挂载app
app.mount('#app')