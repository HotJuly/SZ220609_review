import VueRouter from 'vue-router';
import Vue from 'vue';

import A from '@/components/A.vue';
import B from '@/components/B.vue';
Vue.use(VueRouter);


export default new VueRouter({
    mode:"hash",
    routes:[
        {
            path:"/a",
            component:A
        },
        {
            path:"/b",
            component:B
        }
    ]
})