<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <slot></slot>
    <slot name="header"></slot>
    <slot name="footer" msg="我是插槽的数据"></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<script setup>

</script>

<style scoped>
</style>
