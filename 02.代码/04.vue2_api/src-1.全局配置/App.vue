<template>
  <div id="app">
    <!-- <About></About> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
    console.log('App',this.$options.a)
    // console.log('App c',c)
  },
  a:2
}
</script>

<style>
</style>
