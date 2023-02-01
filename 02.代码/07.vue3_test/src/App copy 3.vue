<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>user的name:{{user.name}}</h1>
  <h1>user的age:{{user.age}}</h1>
  <h1>user2的name:{{user2.name}}</h1>
  <h1>user2的age:{{user2.age}}</h1>
</template>

<script>
import {reactive} from 'vue';
export default {
  name: 'App',
  setup(){
    /*
      reactive
        数据类型:函数
        返回值:Proxy对象
        在使用该方法的过程中,一共出现了两个对象
          -一个是元对象 =>  元对象就是真正具有数据的对象,也就是所谓的厂家
          -一个是代理对象 => 代理对象身上并没有任何的数据,如果开发者找他读取数据,JS会自动找元对象读取数据
    
        注意点:
          1.在开发中,千万不要修改元对象,因为元对象没有响应式效果,他就是一个普通对象
            想要有响应式的效果,一定要操作代理对象
    */

    let user = {
      name:"xiaoming",
      age:23
    }

    let user2 = reactive(user);

    // console.log(user,user2)

    setTimeout(()=>{
      // user.name = "laowang";
      user2.name = "laowang";
      // console.log(user)
    },2000)

    return {
      user,
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
