import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from "axios";
import store from "./store";
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, { /* options */ });

Vue.prototype.$url = (process.env.VUE_APP_ENV ? 'http://localhost:8000' : 'https://weskool.team:8000' );
Vue.prototype.$auth = (process.env.VUE_APP_ENV ? 'http://localhost:6443' : 'https://weskool.team:6443' );
Vue.prototype.$client_id = (process.env.VUE_APP_CLIENT_ID);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
