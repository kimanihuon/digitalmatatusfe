import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from "axios";
import store from "./store"

Vue.prototype.$url = (process.env.VUE_APP_ENV ? 'http://localhost:8000' : 'https://weskool.team:8000' );
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
