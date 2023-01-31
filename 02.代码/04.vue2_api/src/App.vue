<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <header v-show="$route.meta.showHeader">123</header>
    <router-view></router-view>
    <router-link to="/home">toHome</router-link>
    <!-- <router-link to="/about">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    toAbout(){
      // this.$router.push('/about');
      this.$router.replace('/about');
    }
  }
}
</script>

<style>
</style>
