<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" :fn="fn" />
    <!-- <h1>{{ user.name }}</h1> -->
    <!-- <h1>c:{{c}}</h1> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // data:{
  //   msg:"我是初始化数据"
  // }
  // 需求:现在有一个数据想要放在data中,但是又不希望他是响应式的
  data(){
    return {
      // msg:"我是初始化数据",
      // _msg:"我是初始化数据",
      // user:Object.freeze({
      //   name:"xiaoming"
      // }),
      c:""
    }
  },
  mounted(){
    // console.log(this.msg,this._msg)
    // this.user.name="laowang"
  },
  components: {
    HelloWorld
  },
  methods:{
    fn(data){
      console.log('fn',data,this)
      this.c = data;
    }
  },
  fn(data){
    console.log('fn',data,this)
    this.c = data;
  }
}
</script>

<style>
</style>
