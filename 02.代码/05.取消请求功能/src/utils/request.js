import axios from 'axios';
import store from '@/store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{
    // console.log(config)
    // 获取到当前发送出去的请求链接
    const url = config.url;

    config.cancelToken = new CancelToken((cb)=>{
        // 此回调函数与Promise的回调函数相似,都是同步执行
        // cb是一个函数,只要这个函数被调用,axios就会自动取消对应的请求
        store.commit('ADD_FN',{url:url,cb:cb});
    });

    return config
})

request.interceptors.response.use((response)=>{
    // console.log(response)
    // 获取到当前响应的请求路径
    const url = response.config.url;

    store.commit('REMOVE_FN',url);
    return response.data;
})

export default request