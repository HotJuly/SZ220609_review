<template>
  <HelloWorld ref="hello" msg="Welcome to Your Vue.js App"/>
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

// 此处的取名,必须与标签属性ref的值同名,否则无法得到对应的组件实例
// 因为Vue3无法使用this,所以更没办法使用this.$refs了
// 在Vue3中,想通过组件实例对象获取到子组件的数据,必须在子组件使用defineExpose向外暴露才能使用
// 没有暴露的数据,将无法获取
const hello = ref();

setTimeout(()=>{
  console.log('msg1',hello.value.msg)
  console.log('msg2',hello.value.msg2)
},2000)

</script>

<style>
</style>
