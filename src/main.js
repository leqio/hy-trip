import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './stores'
// 在vite.config.js里配置了自动引入组件的工具unplugin-vue-components/vite，就不用手动引入组件了
// import { Tabbar, TabbarItem } from 'vant';

import 'normalize.css'
import './assets/css/index.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
// app.use(Tabbar);
// app.use(TabbarItem);

app.mount('#app')
