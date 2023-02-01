<template>
  <h1>元对象的name:{{user.name}}</h1>
  <h1>reactive对象的name:{{user1.name}}</h1>
  <h1>reactive对象的age:{{user1.age}}</h1>

  <h2 v-for="item in arr" :key="item">{{ item }}</h2>
</template>

<script>
import {reactive} from 'vue';
export default {
  name: 'App',
  setup(){
    let user = {
      name:"xiaoming"
    }

    let user1 = reactive(user);

    let arr = reactive([1,2,3,4]);

    setTimeout(()=>{
      // Vue3中,解决了Vue2添加属性和删除属性,经常不具有响应式效果的问题
      // user1.age = 23;
      // delete user1.name;

      // Vue3中,可以直接通过数组的下标,对数据进行修改,也具有响应式效果
      // 所以,在Vue3,不需要对数组的7种方法进行重写
      arr[1] = 9;
    },2000)

    return {
      user,
      user1,
      arr
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
