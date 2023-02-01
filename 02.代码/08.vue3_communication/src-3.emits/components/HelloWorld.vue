<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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
// this.$emit('abc')
import {defineEmits} from 'vue';
const emits = defineEmits(["abc"]);


setTimeout(()=>{
  emits("abc","我是abc的数据")
  // emits("ddd","我是ddd的数据")
},2000)

</script>

<style scoped>
</style>
