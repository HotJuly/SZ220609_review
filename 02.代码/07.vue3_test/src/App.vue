<template>
  <h1>元对象的name:{{user.name}}</h1>
  <h1>ref对象的name:{{user1.name}}</h1>
  <h1>reactive对象的name:{{user2.name}}</h1>
</template>

<script>
import {ref,reactive} from 'vue';
export default {
  name: 'App',
  setup(){

    /*  
      ref和reactive的区别
        ref
          传入的可以是任意数据类型
          ref如果接收到了对象数据类型,他就会将该对象传递给reactive处理,将处理完得到的Porxy对象,
            放入自己的value属性中

        reactive
          传入的必须是一个对象

        1.在模版中使用
          两者没有区别

        2.在js代码中使用
          ref对象一定要.value,Proxy对象可以直接修改属性值

          区别点:ref对象的value属性具有响应式效果,所以它可以监视到对象地址值的变化
              而存储reactive对象的变量不具有响应式效果,所以监视不到对象地址值的变化

        使用场景:
          1.如果未来可能出现更换对象的操作,那么就选择使用ref
            因为ref的value属性能够监视到对象的变化

          2.如果未来不打算更换对象,只是修改对象的属性值,那么就选择使用reactive
            因为reactive修改属性,不需要.value,可以少写一些代码
    
    */

    let user = {
      name:"xiaoming"
    }

    let user1 = ref(user);

    let user2 = reactive(user);

    // console.log(user1,user2)

    setTimeout(()=>{
      // user1.value.name="laowang1";
      // user2.name="laowang2";

      // user1.value = {
      //   name:"laowang33333"
      // }

      user2 = {
        name:"laowang33333"
      }

    },2000)

    return {
      user,
      user1,
      user2
    }
  },
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
