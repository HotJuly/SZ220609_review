<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      msg:123
    }
  },  
  components: {
    HelloWorld
  },
  beforeCreate(){
    console.log('--------beforeCreate--------',this,this.$data,this.msg,this.$el)
  },
  created(){
    console.log('--------created--------',this,this.$data,this.msg,this.$el)
  },
  beforeMount(){
    console.log('--------beforeMount--------',this,this.$data,this.msg,this.$el)
  },
  mounted(){
    console.log('--------mounted--------',this,this.$data,this.msg,this.$el)
  }
}
</script>

<style>
</style>
