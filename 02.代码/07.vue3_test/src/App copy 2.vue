<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>App:{{msg}}</h1>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue';
export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  setup(){
    // console.log('----------setup-----------',this)
    /*
      setup是Vue3新增的一个生命周期
      他执行时机是最早的,早于beforeCreate
      该生命周期中,没有this,所以以前依赖于this的写法全部要发生变化
      该生命周期需要返回一个对象,对象中的数据可以用于模版中进行显示,类似于以前的data
        与data的区别,该函数返回的对象中的属性,不会自动变成响应式的
    */

    /*
      ref
        数据类型:函数
        返回值:对象
        ref对象身上具有一个value属性,这个属性是一个响应式属性
          注意:不要直接去修改变量的值,没用,要想实现响应式效果,一定要去修改value属性

        使用方法:
          1.在js代码中使用
            无论是读取/修改属性,都需要书写.value才行

          2.在template中使用
            不需要书写.value,因为Vue如果发现使用的是一个ref对象,他会自动读取.value的值在继续做其他事情
    */
    let msg = ref("我是setup的数据");

    setTimeout(()=>{
      msg.value+="!!!!!!!!"
      // console.log('msg',msg)
    },3000)
    // console.log('msg',msg)

    return {
      msg
    }
  },
  // beforeCreate(){
  //   console.log('----------beforeCreate-----------',this)
  // },
  // created(){
  //   console.log('----------created-----------')
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
