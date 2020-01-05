import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/comm.css'

axios.defaults.baseURL="http://localhost:5050";
axios.defaults.withCredentials=true;

Vue.prototype.axios = axios;

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
