import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  请问,在Vue中,可以影响到页面显示内容的地方有几个?
    有三个
      1.public文件夹中的index.html文件内容
      2.main.js中,new Vue的配置对象中的template配置选项
      3.main.js中,new Vue的配置对象中的render配置选项

    优先级:render配置>template配置>el配置
*/

new Vue({
  data:{
    msg:"我是index.html的内容",
    msg2:"我是template的内容"
  },
  el:"#app",
  template:"<h1>{{msg2}}</h1>",
  render: h => h(App),
})
// .$mount('#app')
