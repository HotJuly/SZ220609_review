import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Vue.filter("myFilter",function(a){
//   console.log('myFilter',a,this)
//   return a + 123;
// })

/*
  需求:当前项目,在每个组件挂载结束之后,打印当前组件名称
  解决:
    使用混入/混合可以解决
      混入分为两种
        1.全局混入
        2.局部混入

      优先级:当前组件内置>局部混入>全局混入
      如果是生命周期钩子函数,那么所有的都会执行
        执行顺序:全局混入->局部混入->当前组件内置
*/

Vue.mixin({
  mounted(){
    // 该混入会注入到所有组件身上
    // 所以此处的this就是每个组件实例对象
    console.log('全局混入',this.$options.name)
  }
})

// Vue.prototype.$vuex = Vue.observable({
//   count:0
// })

new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')
