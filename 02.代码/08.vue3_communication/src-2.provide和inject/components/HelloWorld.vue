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
  },
  // inject:["msg1"]
}
</script>

<script setup>
import {inject} from 'vue';
const msg2 = inject("msg1");
// console.log('msg2',msg2)

setTimeout(()=>{
  msg2.value="我是hello修改的新值"
},2000)
</script>

<style scoped>
</style>
