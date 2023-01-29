<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <BigImage/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/bigImage.vue'

export default {
  name: 'App',
  data(){
    return {
      msg1:"我是初始化数据"
    }
  },
  components: {
    HelloWorld,
    BigImage
  },
  mounted(){
    // console.log(this.$data.msg,this.msg)
    console.log(this.$children)
  }
}
</script>

<style>
</style>
