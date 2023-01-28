<template>
  <div id="app">
    <h1>我是APP:{{user.name}}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      ccc:888,
      user:{
        name:"xiaoming"
      }
    }
  },
  components: {
    HelloWorld
  },
  // provide:{
  //   // a:777
  //   a:this.ccc
  // }

  provide(){
    // provide函数的this,就是当前组件的实例对象
    // 并且,provide函数会在data函数执行之后才执行
    return {
      // a:this.ccc
      a:777,
      user:this.user
      // user:{
      //   name:"xiaoming6666"
      // }
    }
  }
}
</script>

<style>
</style>
