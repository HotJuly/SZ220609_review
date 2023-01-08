/*
    node中的宏任务:
        1.定时器
        2.setImmediate

    定时器相关的问题:
        1.setTimeout的第二个参数,是用于设定回调函数的延迟时间的
            注意了,该数值的最小值为1,即便你写0,也是1
        解决方法:只要让主线程代码花费时间超过1ms即可



    node事件轮询机制重点
        1.node一共具有6个阶段,其中重要的是1,4,5阶段
            1->定时器阶段
            4->I/O
            5->setImmediate
        2.node中每一个阶段都是一个宏任务队列
        3.事件轮询机制的入口是1号阶段,休息区是4号阶段
            事件轮训是从1-6,结束之后,再从1-6,必须走完全程才能走一次轮询,不会出现跳阶段的情况


        4.node中具有.then和nextTick两种微任务
            .then是js中的VIP
            而nextTick就是SVIP
        5.node具有两个微任务队列
            一个是.then专用的
            一个是nextTick专用的
        6.微任务队列的注意点
            微任务队列是清空,只要里面有微任务,你就不能离开当前队列,必须清空才能跳到下一个队列
*/

// setTimeout(()=>{
//     console.log(1)
// },0)

// setImmediate(()=>{
//     console.log(2)
// })

// setTimeout(()=>{
//     console.log(3)
// },0)

// for(var i=0;i<100000;i++){

// }

//----------------------------------------
// const fs = require('fs');

// setTimeout(()=>{
//     console.log(1)
// },0)

// // 文件读写,无论文件大小是多少,光开启读写通道就需要100ms
// fs.readFile('./01.原型扩展题1.html',()=>{
//     console.log(2)

//     setTimeout(()=>{
//         console.log(3)
//     },0)
    
//     setImmediate(()=>{
//         console.log(4)
//     })
// })

// setImmediate(()=>{
//     console.log(5)
// })

// for(var i=0;i<100000;i++){

// }

//----------------------------------------
// Promise.resolve().then(()=>{
//     console.log(1)
// })

// // Promise.resolve().then(()=>{
// //     console.log(2)
// // })

// process.nextTick(()=>{
//     console.log(2)
// })

// Promise.resolve().then(()=>{
//     console.log(3)
// })

//----------------------------------

// Promise.resolve().then(()=>{
//     console.log(1)
    
//     Promise.resolve().then(()=>{
//         console.log(2)
//     })

//     process.nextTick(()=>{
//         console.log(3)
//     })

//     Promise.resolve().then(()=>{
//         console.log(4)
//     })
// })
//----------------------------------------

process.nextTick(()=>{
    console.log(1)
    
    Promise.resolve().then(()=>{
        console.log(2)
    })

    process.nextTick(()=>{
        console.log(3)
    })

    Promise.resolve().then(()=>{
        console.log(4)
    })
})


