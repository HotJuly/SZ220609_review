<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h1>{{msg}}</h1> -->
    <h1>user的name:{{ user.name }}</h1>
    <h1>user的age:{{ user.age }}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      msg: "我是初始化数据",
      user: {
        name: "xiaoming"
      }
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    /*
      Vue的特点
        数据驱动
          只需要关心于数据,不再需要关心DOM节点操作
          其实就是响应式
            当某个属性值发生修改的时候,页面会自动展示出最新的结果

          响应式属性VS非响应式属性
            响应式属性就是当该属性的值发生变化,页面会展示对应数据
            非响应式属性就是当该属性的值发生变化,页面不会展示对应数据,依旧显示旧值

          问题:响应式属性的创建时机?
            一共有两个
              1.当组件初始化的时候,data函数返回的对象中所有属性都会变成响应式属性
                只有在这个时候才会触发Vue的数据劫持,将普通对象变成响应式对象

              2.当对响应式属性赋值的时候,如果属性值是一个对象数据类型,
                那个该对象中所有的属性,都会变成响应式属性

          问题:如何快速判断一个属性是否是响应式属性?
            打印对象,如果属性值是直接显示原值,那么就是非响应式属性
                    如果属性值是...,那么就是响应式属性


          问题:如果错过了以上两个时间点,如何添加响应式属性?
              this.$set
              Vue.set
              Vue.observable

          Vue2的BUG:
            1.新增属性不是响应式的
              Vue.set或者this.$set可以解决

            2.删除属性没有响应式效果
              Vue.delete或者this.$delete可以解决
    */

    // setTimeout(()=>{
    //   // this.msg = "我是修改之后的数据";
    //   // this.user.name="老王"
    //   // this.user.age = 23
    //   // console.log(this.user)
    //   // var user = {
    //   //   name:"老王",
    //   //   age:88
    //   // }

    //   var user = {
    //     name:"老王"
    //   }

    //   this.user = user;

    //   this.$set(this.user,"age",0);



    //   // console.log(this.user)

    //   setTimeout(()=>{
    //     this.user.age = 100;
    //     console.log(this.user)
    //   },2000)

    // },2000)

    setTimeout(() => {
      // delete this.user.name;
      this.$delete(this.user,"name");
      console.log(this.user)
    }, 2000)

  }
}
</script>

<style>

</style>
