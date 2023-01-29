<template>
  <div id="app">
    <h2>App的msg:{{msg}}</h2>
    <!-- <HelloWorld :msg.sync="msg"/> -->
    <HelloWorld :msg="msg" @update:msg="(data)=>msg=data"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      msg:"Welcome to Your Vue.js App",
      user:{
        name:"xiaoming"
      }
    }
  },
  components: {
    HelloWorld
  },
  watch:{
    user(){

    }
  },
  mounted(){
    this.$bus.$emit('sendMsg','hello123');
  }
}
</script>

<style>
</style>
