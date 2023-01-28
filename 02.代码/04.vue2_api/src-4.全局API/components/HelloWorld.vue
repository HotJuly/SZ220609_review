<template>
  <div class="hello">
    <h1>pageX:{{ pageX }}</h1>
    <h1>pageY:{{ pageY }}</h1>
  </div>
</template>

<script>
import moveMixin from '@/mixins/moveMixin'
export default {
  name: 'HelloWorld',
  data(){
    return{
      pageX:-1
    }
  },
  mixins:[moveMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
