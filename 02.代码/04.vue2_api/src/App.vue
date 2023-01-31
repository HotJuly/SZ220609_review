<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
     -->
    <ul>
      <li v-for="(item,index) in arr" :key="index">
        <label>{{ item }}</label>
        <input type="text">
      </li>
    </ul>
    <button @click="handler">添加数字6</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      msg:123,
      arr:[1,2,3,4,5]
    }
  },  
  methods:{
    handler(){
      this.arr.splice(1,0,6);
    }
  },
  components: {
    HelloWorld
  },
  // beforeCreate(){
  //   console.log('--------beforeCreate--------',this,this.$data,this.msg,this.$el)
  // },
  // created(){
  //   console.log('--------created--------',this,this.$data,this.msg,this.$el)
  // },
  // beforeMount(){
  //   console.log('--------beforeMount--------',this,this.$data,this.msg,this.$el)
  // },
  // mounted(){
  //   console.log('--------mounted--------',this,this.$data,this.msg,this.$el)
  // }
}
</script>

<style>
</style>
