/*
  ES6模块化特点
    一个文件,无论被引入多少次,无论被多少人引入,它内部的代码都只会执行一次

*/

// 无论多少个文件引入该js文件,这个数组只会产生一个
// 整个项目中,只有一个callbacks数组
const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false

  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// 此处就是在检测当前环境是否支持Promise
// 如果当前环境不支持Promise,就会使用mutationObserver进行替代
// 如果当前环境不支持mutationObserver,就会使用setTimeout进行替代
if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


// nextTick函数,在第一次引入文件的时候,就会创建成功,但是内部的代码不会立即执行
// 前提:无论该文件引入多少次,整个项目中,只有一个nextTick函数

/*
  1.nextTick会通过callbacks数组,首次开发者传入的所有的回调函数
  2.由于第一次执行nextTick的时候,会将pending修改为true
    导致无论调用多少次nextTick方法,最终只会开启一个微任务
*/
export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })

  if (!pending) {
    pending = true
    timerFunc()
  }
}


/*
  nextTick源码重点:
    1.当开发者调用nextTick的时候,Vue会将传入的回调函数,使用callbacks数组进行收集
        如果是第一次调用nextTick,会使用.then开启微任务,并且将pending值修改为true

    2.当开发者第二次调用nextTick的时候,Vue还是会继续使用callbacks数组收集回调函数
      注意:此次开始由于pending值为true,所以无法再次开启微任务
        也就是说,多个nextTick,只会开启一个微任务

    3.当主线程代码执行结束之后,会清空微任务队列,执行到流程1开启的微任务的时候
      在该微任务中,Vue会遍历callbacks数组,获取到收集的每个回调函数
        并立即执行

    注意点:如果微任务执行之后,再次调用nextTick,可以再次开启新的微任务


  Vue更新DOM的流程
    1.当开发者修改了某个响应式属性,就会触发dep.notify方法
    2.在notify方法中,会调用watcher.update方法
    3.在update方法中,会调用queueWatcher方法
    4.在queueWatcher方法中,会将更新DOM的方法传入nextTick中

*/
