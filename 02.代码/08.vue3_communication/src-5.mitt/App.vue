<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import myBus from '@/myBus';

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<script setup>
// 父组件的setup会早于子组件的setup

myBus.on('abcd',(data)=>{
  console.log('abcd',data)
})
</script>

<style>
</style>
