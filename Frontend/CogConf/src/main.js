import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入插件和语言包
// import VueI18n from 'vue-i18n'
// import zh from '@/i18n/langs/zh'
// import en from '@/i18n/langs/en'
const app = createApp(App)

app.use(router);
// app.use(VueI18n);

app.mount('#app')