<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>App:{{msg}}</h1>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue';
export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  setup(){

    return {
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
