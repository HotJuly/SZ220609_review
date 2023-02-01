<template>
  <HelloWorld msg="Welcome to Your Vue.js App">
    <template #default>
      <h1>我是默认插槽</h1>
    </template>
    <template #header>
      <h1>我是具名插槽header</h1>
    </template>
    <template #footer="scope">
      <h1>我是作用域插槽footer,{{scope.msg}}</h1>
    </template>
  </HelloWorld>
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
