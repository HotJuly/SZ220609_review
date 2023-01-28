<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
    <h1>a:{{ a }}</h1> -->
    <h1>我是Hello:{{ user.name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  inject:["a","user"],
  mounted(){
    setTimeout(()=>{
      this.user.name="laowang"
    },2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
