<template>
  <div class="hello">
    <h1 @click="handler">hello的msg1:{{ msg }}</h1>
    <h1 v-pre>hello的msg2:{{ msg }}</h1>
    <h1 v-once>hello的msg3:{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    handler() {
      this.$emit('update:msg', "我是修改之后的数据")
    }
  },
  mounted(){
    this.$bus.$on('sendMsg',function(data){
      console.log('sendMsg',data)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
