<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <slot></slot>
    <slot name="header"></slot>
    <slot name="footer" msg="大家好,我是footer"></slot>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
