import axios from 'axios';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

request.interceptors.request.use((config)=>{
    return config
})

request.interceptors.response.use((response)=>{
    return response.data;
})

export default request