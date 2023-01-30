<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
     -->
     <!-- <h1>arr[1]:{{ arr[1] }}</h1>
     <button @click="handler">修改内容</button> -->

     <h1 v-if="isShow1">我是h1</h1>
     <h2 ref="h2" v-if="isShow2">我是h2</h2>
     <h3 ref="h3" v-if="isShow3">我是h3</h3>
     <button @click="showHandler">显示</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      arr:[5,6,7,8],
      isShow1:true,
      isShow2:false,
      isShow3:false
    }
  },
  methods:{
    handler(){
      // this.arr[1] = 10;
      // this.arr.splice(1,1,10);
      // console.log(this.arr)

      // var arr = [5,6,7,8];
      // arr.splice(1,1,10);
      // console.log(arr)
    },
    showHandler(){
      /*
        问题1:Vue2更新DOM是同步更新还是异步更新?
        回答:是异步更新,会将更新DOM的方法传入nextTick,在微任务中进行更新效果

        问题2:请问Vue2更新DOM的范围是多大?
        回答:整个组件

        问题3:如何才能导致Vue2出现更新DOM的操作?
        回答:只要响应式属性的值发生变化
      


        总结:Vue2中,只要组件中任何一个响应式属性发生变化,就会开启更新DOM的方法
          更新DOM的范围是整个组件,多次更新数据,只会触发一次DOM更新

          无论多少个组件更新,无论一个组件更新多少次,Vue都只会开启一个更新DOM的函数
      */

      this.isShow2 = true;

      this.$nextTick(()=>{
        console.log(2,this.$refs.h2)
        console.log(3,this.$refs.h3)
      })

      this.isShow3 = true;

      /*
        更新响应式属性到DOM更新整体流程:
        以上代码:
          1.触发dep.notify方法,遍历dep.subs,来通知对应的watcher对象准备更新
          2.watcher对象会调用update方法,来准备开始更新当前对应的组件
          3.update方法中,会调用queueWatcher方法
          4.在queueWatcher方法中,
              -获取到当前watcher的id
              -判断has对象身上,是否具有当前watcher的id
                验证当前watcher是否已经存在于DOM更新队列queue
              -将当前的watcher对象,存入queue数组中,方便未来统一更新
              -判断当前是否是第一个进入queueWatcher方法的组件,
                如果是,就将更新DOM的方法传给nextTick
                那么此时这个更新DOM的方法,就会存放在nextTick的callbacks队列中
          5.当主线程代码都执行结束之后,开始执行nextTick中的任务的时候
            更新DOM的方法就会被调用
          6.更新DOM的方法中,
            -使用sort方法,对queue队列中的watcher进行排序,实现根据id的升序排序\
              优先更新最外层组件
            -遍历queue队列,获取到内部存储的所有的watcher对象,并调用watcher的run方法,实现组件的DOM更新效果
      
      */

    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
</style>
