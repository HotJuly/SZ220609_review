import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        fns:{}
    },
    mutations:{
        ADD_FN(state,{url,cb}){
            state.fns[url] = cb;
        },
        REMOVE_FN(state,url){
            delete state.fns[url];
        },
        CLEAR_FNS(state){
            Object.values(state.fns).forEach((cb)=>{
                cb();
            })
        }
    }
})