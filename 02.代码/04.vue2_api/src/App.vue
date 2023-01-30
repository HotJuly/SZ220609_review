<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
     -->
     <h1>arr[1]:{{ arr[1] }}</h1>
     <button @click="handler">修改内容</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      arr:[5,6,7,8]
    }
  },
  methods:{
    handler(){
      // this.arr[1] = 10;
      // this.arr.splice(1,1,10);
      // console.log(this.arr)

      var arr = [5,6,7,8];
      arr.splice(1,1,10);
      console.log(arr)
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
</style>
