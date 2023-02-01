<template>
  <div id="About">
    About
  </div>
</template>

<script>

export default {
  name: 'About',
  mounted(){
    this.$API.getData1()
    .then((data)=>{
      console.log('About-getData1',data)
    });

    this.$API.getData2()
    .then((data)=>{
      console.log('About-getData2',data)
    });

    this.$API.getData3()
    .then((data)=>{
      console.log('About-getData3',data)
    });

    this.$API.getData4()
    .then((data)=>{
      console.log('About-getData4',data)
    });
  }
}
</script>

<style>
</style>
