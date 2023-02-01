<template>
  <HelloWorld msg="Welcome to Your Vue.js App" @abc="handler" @ddd="handler"/>
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
const handler=(data)=>{
  console.log('handler',data)
}
</script>

<style>
</style>
