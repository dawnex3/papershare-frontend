import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 导入插件
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
<<<<<<< HEAD
import setItemEvent from './utils/setItemEvent.js'


=======
>>>>>>> beda06369169a4ed3b730f5d2ddc61632d559ecc
// 导入axios，设置默认baseURL
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:2345/api'
//为所有请求添加token
axios.interceptors.request.use(
    config => {
        if (localStorage.Token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = localStorage.Token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// 创建vue实例app
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
<<<<<<< HEAD
}
=======
  }
>>>>>>> beda06369169a4ed3b730f5d2ddc61632d559ecc
// 启动我们需要的插件
app.use(router)
app.use(ElementPlus)
// 配置vue启用axios
app.config.globalProperties.$axios = axios
// 挂载app
app.mount('#app')
<<<<<<< HEAD
app.use(setItemEvent)
=======
>>>>>>> beda06369169a4ed3b730f5d2ddc61632d559ecc
