import Vue from 'vue';
import App from './App.vue';
import router from './router/router';

import "../static/css/reset.css";
import axios from 'axios';
import store from "./store.js";


Vue.prototype.$axios = axios;
Vue.prototype.$store = { store };
Vue.config.productionTip = false;






new Vue({
  render: h => h(App),
  router,
  store,
 
}).$mount('#app')
