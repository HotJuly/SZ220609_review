<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Hello的数据:{{ msg123 }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props: {
  //   msg: String
  // }
}
</script>

<script setup>
import {defineProps,defineEmits} from 'vue';
const props = defineProps(["modelValue","value","msg123"]);
const emits = defineEmits(["update:msg123"]);
console.log(props)

setTimeout(()=>{
  emits("update:msg123","我是hello修改之后的数据")
},2000)

</script>

<style scoped>
</style>
