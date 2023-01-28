<template>
  <div class="hello">
    <!-- <h1 ref="h1" v-if="isShow">{{ msg }}</h1> -->
    <!-- <button @click="clickHandler">显示h1</button> -->

    <input ref="input" v-if="isShow" />
    <button v-else @click="clickHandler">添加</button>
  </div>
</template>

<script>
// import "@/test.js";
export default {
  name: 'HelloWorld',
  data() {
    return {
      isShow: false
    }
  },
  props: {
    msg: String
  },
  mounted(){

    // 感觉这里似乎有一个看不见的nextTick
    // this.isShow = true;

    // Promise.resolve().then(()=>{
    //   console.log(1)
    // })

    // this.$nextTick(()=>{
    //   console.log(2)
    // })

    // Promise.resolve().then(()=>{
    //   console.log(3)
    // })

    // this.$nextTick(()=>{
    //   console.log(4)
    // })

    // setTimeout(()=>{
    //   this.$nextTick(()=>{
    //     console.log(5)
    //   })
    // },2000)

  },
  methods: {
    clickHandler() {
      /*
        问题一:请问Vue更新数据是同步更新还是异步更新?
        回答:同步更新数据
          只要更新了数据,后面随便使用,一定能得到最新数据
      
        问题二:请问Vue更新DOM是同步更新还是异步更新?
        回答:异步更新DOM节点
          相当于是防抖操作,将多次DOM更新,合并成一次
          Vue只会根据最后的数据,来生成DOM节点

          更新DOM是异步更新,他是一个微任务,它内部用到了nextTick

      nextTick
        1.他是什么?
          他是Vue2推出的API

        2.为什么要用?
          Vue更新数据是同步更新,但是更新DOM是异步更新
          如果我们有件事情(回调函数),需要在DOM更新之后才做,就必须使用nextTick才能实现

        3.怎么用?
          nextTick一共具有两个API,但源码是同一份
            Vue.nextTick
            this.$nextTick

          nextTick会接收一个回调函数,该回调函数会在DOM更新之后执行

        4.哪里用到了?
          在后台管理系统的编辑模式切换中使用到了
            简单来说就是切换input和button的显示,并自动获取焦点

        5.原理
          nextTick可以将一个回调函数,放到未来去执行,所以他是一个异步任务
          通过打印代码,可以直观的看到,nextTick内部其实用的是.then(是微任务)

          必须在更新了数据之后,再调用nextTick,才能获取到最新的DOM节点
        
      */

      // this.$nextTick(()=>{
      //   this.$refs.input.focus();
      // })

      // console.log(1, this.isShow)
      this.isShow = true;
      // console.log(2, this.isShow)

      // this.$nextTick(()=>{
      //   this.$refs.input.focus();
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
