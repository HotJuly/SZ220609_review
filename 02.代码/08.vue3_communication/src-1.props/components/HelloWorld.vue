<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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
import {defineProps} from 'vue'
/*
  setup标签,其实本质上就是配置对象中的setup生命周期钩子函数
  区别是:当前setup标签中,所有的内部变量都会自动暴露出去,给template进行使用
      他会自动将内部的变量全部return出去

  Vue3+TS实现对象写法的props
    defineProps<{
      msg:String
    }>()

    如果想要在js中使用props的数据,必须书写const props = defineProps(["msg","changeMsg"]);
      使用变量接收defineProps的返回值
*/

const props = defineProps(["msg","changeMsg"]);
console.log(props)

setTimeout(()=>{
  props.changeMsg('我是hello的数据')
},2000)
</script>

<style scoped>
</style>
