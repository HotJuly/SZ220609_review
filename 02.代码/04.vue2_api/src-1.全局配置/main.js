import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Vue.config.devtools = true;

/*
  需求:将所有组件配置对象中的a属性值+1
  可以通过自定义合并策略,对当前项目中所有组件的配置对象进行统一修改
*/

// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   console.log(parent, child, vm)
//   return child * 3
// }


/*
  面试题:请问你在开发中,是如何捕获到项目中出现的错误的?
  解决:
    1.try...catch{}
      捕获范围很小.只能捕获到try括号中的错误

    2.Promise的catch方法或者.then的第二个回调函数
      只能捕获promise相关的报错

    3.生命周期errorCaptured
      他只能捕获后代组件的报错,当前组件自己报错是捕获不到的

    4.使用全局配置(Vue项目中用的最多的)
      使用Vue.config.errorHandler=function(){}
      可以捕获到当前项目中,所有的报错

      该功能又称为错误边界

    扩展:
      1.window的error事件(原生项目中会使用到)
        window.onerror=function(){}


  进阶面试题:请问,你在项目上线之后,如何捕获到项目中出现的报错的?
  解决:
    1.首先通过上述四种错误捕获方法,捕获到当前项目中的报错
    2.将捕获到的报错信息,使用ajax或者他的类库(axios),将错误信息发送到公司专门的错误捕获服务器或者错误捕获接口
    3.项目经理会将得到的报错,全部汇总到禅道或者TAPD等平台上

*/
// Vue.config.errorHandler = function(err, vm, info){
//   console.log(err, vm, info)
// }

// Vue.config.ignoredElements = [
//   "About",
//   /^t-/
// ]

new Vue({
  render: h => h(App),
}).$mount('#app')
