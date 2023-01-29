<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <A v-if="isShow"/>
    <B v-else/> -->

    <!-- <A v-if="isShow===0"/>
    <B v-if="isShow===1"/> -->

    <!-- <component :is="showComponent"></component>
    <button @click="handler">切换</button> -->

    
    <HelloWorld msg="Welcome to Your Vue.js App">
      <template>
        <h1>我是默认插槽</h1>
      </template>
      <template v-slot:header>
        <h1>我是header插槽</h1>
      </template>
      <template #footer="scope">
        <h1>我是footer插槽,{{scope.msg}}</h1>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'
import B from './components/B.vue'

export default {
  name: 'App',
  data(){
    return{
      // isShow:true
      isShow:0,
      showComponent:A
    }
  },
  components: {
    HelloWorld,
    // A,
    // B
  },
  methods:{
    handler(){
      this.showComponent = B;
    }
  }
}
</script>

<style>
</style>
