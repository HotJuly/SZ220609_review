<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-link to="/a">显示A</router-link>
    <router-link to="/b">显示B</router-link>

    <!-- <transition name="fade">
      <router-view></router-view>
    </transition> -->

    <!-- <keep-alive exclude="A">
      <A v-if="isShow" />
      <B v-else />
    </keep-alive> -->

    
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- Vue3写法 
    
    
      <router-view>
        <keep-alive></keep-alive>
      </router-view>
    
    -->

    <!-- <button @click="isShow = !isShow">切换</button> -->

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from '@/components/A.vue'
import B from '@/components/B.vue'

export default {
  name: 'App',
  data() {
    return {
      isShow: true
    }
  },
  components: {
    HelloWorld,
    A,
    B
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: transform 4s;
}

.fade-enter

/* .fade-leave-active below version 2.1.8 */
  {
  transform: translateX(100%)
}

.fade-enter-to

/* .fade-leave-active below version 2.1.8 */
  {
  transform: translateX(0)
}

.fade-leave

/* .fade-leave-active below version 2.1.8 */
  {
  transform: translateX(0)
}

.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  transform: translateX(-100%)
}
</style>
