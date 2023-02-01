<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <A v-bind="attrs"></A> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props: {
  //   msg: String
  // }
}
</script>

<script setup>
import { defineProps , useAttrs, defineEmits } from 'vue';
const props = defineProps(["a"]);
const attrs = useAttrs();
defineEmits(["ddd"]);

console.log(props,attrs)

</script>

<style scoped>
</style>
