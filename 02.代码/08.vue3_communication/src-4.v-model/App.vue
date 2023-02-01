<template>
  <h1>App的msg:{{msg}}</h1>
  <HelloWorld msg="Welcome to Your Vue.js App" v-model:msg123="msg"/>
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
const msg = ref('你好,我是APP');


</script>

<style>
</style>
