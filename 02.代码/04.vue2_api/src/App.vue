<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
// import "@/test.js";
// console.log(HelloWorld)

export default {
  name: 'App',
  // 将引入的配置对象,变成对应的构造函数,从而实现每使用一次就会产生一个新的组件实例对象
  // 其实就是将传入的配置对象,通过Vue.extend生成了对应的构造函数
  components: {
    HelloWorld:HelloWorld
  }
}
</script>

<style>
</style>
