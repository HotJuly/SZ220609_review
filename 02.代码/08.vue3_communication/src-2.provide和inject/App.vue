<template>
  <h1>{{ msg }}</h1>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  // provide:{}
}
</script>

<script setup>
import {ref,provide} from 'vue';

const msg = ref('我是APP');

provide('msg1',msg);
</script>

<style>
</style>
