import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from './router';
import 'ant-design-vue/dist/reset.css';
import './main.css'

createApp(App).use(router).use(Antd).mount('#app');
