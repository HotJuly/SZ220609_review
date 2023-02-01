<template>
  <h1>App的msg:{{msg}}</h1>
  <HelloWorld :msg="msg" :changeMsg="changeMsg"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<script setup>
import {ref} from 'vue';

const msg = ref('我是APP组件的数据');

// Vue3使用props实现子向父传参的原理,不再是强制函数的this了,而是使用闭包实现对父组件数据的修改
const changeMsg = (data)=>{
  msg.value = data;
}


</script>

<style>
</style>
