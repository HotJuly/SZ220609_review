<template>
  <div id="Home">
    Home
  </div>
</template>

<script>

export default {
  name: 'Home',
  mounted(){
    this.$API.getData1()
    .then((data)=>{
      console.log('Home-getData1',data)
    });

    this.$API.getData2()
    .then((data)=>{
      console.log('Home-getData2',data)
    });

    this.$API.getData3()
    .then((data)=>{
      console.log('Home-getData3',data)
    });

    this.$API.getData4()
    .then((data)=>{
      console.log('Home-getData4',data)
    });
  }
}
</script>

<style>
</style>
