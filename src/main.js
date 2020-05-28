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

Vue.prototype.$http.create({ withCredentials: true })
  .post(`${Vue.prototype.$auth}/api/login/verify`)
  .then(response => {
    // console.log(response)
    if (response.data.authorized) {
      
      store.commit("setUserDetails", response.data.details);
      store.commit("switchAuth", true);
    } else {
      store.commit("switchAuth", false);
    }
  })
  .catch(function (error) { // eslint-disable-line
    store.commit("switchAuth", false);
    // handle error
    console.log(error);
  })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
