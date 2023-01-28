<template>
  <div class="hello">
    <h1>msg:{{ msg }}</h1>
    <h2>{{ a }}</h2>
    <h2>{{ a }}</h2>
    <h2>{{ a }}</h2>
    <h2>{{ a }}</h2>
    <h2>{{ a }}</h2>
    <h2>{{ a }}</h2>
    <h2>{{ a }}</h2>
    <h2>{{ a }}</h2>
    <h2>{{ a }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    fn:Function
  },
  // mounted(){
  //   this.fn(333);
  // }
  // props:["msg"],
  /*
    面试题:请说明computed和watch的区别?
    解答:
      1.相同点
        1.两个人的语法非常相近
          都是一个对象,对象内部可以书写函数

        2.他们都可以监视某些数据的变化,如果监视的数据发生变化,就会执行对应的回调函数
          扩展:监视的数据必须是响应式的

      2.不同点
        1.返回值效果不同
          computed的返回值可以用于页面显示和代码计算
          watch的返回值没有任何作用

          个人看法:computed更注重于结果,watch更注重于过程

        2.使用场景
          computed
            如果现在想要一个数据,但是手头没有,不过可以根据现有数据计算得到,就使用computed
            
            例如:购物车模块的总价/总数功能
              虽然我们没有总数的数据,但是可以根据现有的购物车列表,计算得到

          watch
            如果数据发生了变化,需要做某些事情(执行某些代码),就使用watch

            例如:项目中的搜索框搜索功能

        3.computed具有缓存
          只要computed监视的属性不发生变化,那么就可以不断复用上次计算的结果

  
  
  */
  computed:{
    a(){
      console.log(1)
      return this.msg + "!!!!!!!!!!!!!!!!!!!"
    }
  },
  // watch:{
  //   a(){}
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
