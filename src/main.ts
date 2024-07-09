import './assets/main.css';

import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import { createYmaps } from 'vue-yandex-maps';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(
  createYmaps({
    apikey: 'ca5241f0-20a2-4fe1-81af-13f6f047a313',
  }),
);
app.use(Antd);
app.use(router);

app.mount('#app');
