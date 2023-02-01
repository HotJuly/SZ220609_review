import Vue from 'vue'
import App from './App.vue'

import store from './store';
import router from './router';

import * as $API from './api/index';

Vue.prototype.$API = $API;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
