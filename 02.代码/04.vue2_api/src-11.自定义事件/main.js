import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.prototype.$bus = new Vue();


new Vue({
  // beforeCreate(){
  //   Vue.prototype.$bus = this;
  // },
  render: h => h(App),
}).$mount('#app')
