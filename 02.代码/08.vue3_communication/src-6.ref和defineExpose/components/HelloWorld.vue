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
  // setup(){
  //   const msg2;
  // }
}
</script>

<script setup>
// 个人理解:由于setup标签其实是setup函数,那么该函数中的变量,正常情况下,是无法通过组件实例获取的
// 所以Vue3推出了defineExpose,方便开发者向外暴露setup作用域中的数据
import {ref,defineExpose} from 'vue';

const msg = ref('你好,我是子组件的数据');
const msg2 = ref('你好,我是子组件的数据222222');
msg2.value+="!!!!";

defineExpose({
  msg
})

</script>

<style scoped>
</style>
