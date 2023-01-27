import Vue from 'vue';

/*
    该文件是router-view的源码实现
    router-view是函数组件
    实现原理:
        1.声明当前组件是router-view组件
        2.通过depth变量,记录当前是几级路由
            (通过while循环,从当前组件往上找,看遇到了几个rouiter-view,直至找到路由根组件为止)
        3.通过router上的mapRoutes对象,配合当前的路由地址,搜索出所有路径相似的路由,获取到对应的组件
        4.将对应的组件通过createElement方法,生成虚拟DOM
*/
export default {
    name:"RouterView",
    functional:true,
    render:(_,{parent,props,data,children})=>{


        // 获取父组件创建虚拟DOM的方法
        let createElement = parent.$createElement;

        //获取当前的路由地址
        let path = Vue.prototype.route.path;

        let component = Vue.prototype.router.mapRoute[path];

        return createElement(component,data)
    }
}