import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/Home.vue'
import About from '@/components/About.vue'

Vue.use(VueRouter);

export default new VueRouter({
    mode:"history",
    routes:[
        {
            path:"/about",
            component:About
        },
        {
            path:"/home",
            component:Home,
            meta:{
                showHeader:true
            }
            // component:()=>import('@/Home.vue')
        },
        // {
        //     path:"/home1",
        //     component:Home1
        // }
    ]
})