import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
import './axios/index';
import GlobalComponents from './utils/components/index';

const app = createApp(App);
app.config.globalProperties.$mitt = mitt();
GlobalComponents(app).use(store).use(ElementPlus).use(router).mount('#app');
