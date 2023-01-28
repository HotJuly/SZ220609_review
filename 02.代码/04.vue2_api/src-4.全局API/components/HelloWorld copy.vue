<template>
  <div class="hello">
    <h1>{{ msg | timeFilter }}</h1>
  </div>
</template>

<script>
import testMixin from '@/mixins/test';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mixins:[testMixin],
  filters:{
    timeFilter(a){
      // console.log('myFilter',a,this)
      return a + 123;
    }
  },
  mounted(){
    console.log(this.$options.name)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
