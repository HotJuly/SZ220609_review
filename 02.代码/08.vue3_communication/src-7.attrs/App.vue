<template>
  <HelloWorld msg="Welcome to Your Vue.js App" 
  a="1" b="2" c="3" @abc="()=>{}" @ddd="()=>{}"/>
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

</script>

<style>
</style>
