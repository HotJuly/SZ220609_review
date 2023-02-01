import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,asyncRoutes,anyRoutes,constantRoutes } from '@/router'
import router from '@/router';

import {cloneDeep} from 'lodash'

function filterAsyncRoutes(asyncRoutes,routeNames){
  /*
    参数:
      asyncRoutes->当前项目所有的异步路由对象组成的数组
      routeNames->当前账号有资格访问的路由名称组成的数组

    目的:
      过滤得到当前账号有资格访问的异步路由对象组成的数组

    返回值的数据类型:routeObj[]
  
  */
  const newAsyncRoutes = asyncRoutes.filter((routeObj)=>{
    // filter的返回值如果是true,就代表要留下当前这一项

    // 获取到当前路由对象的路由别名
    const name = routeObj.name;

    // if(routeObj.children&&routeObj.children.length){
    if(routeObj.children?.length){
      routeObj.children = filterAsyncRoutes(routeObj.children,routeNames);
    }

    return routeNames.includes(name)
  })

  return newAsyncRoutes;
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',

    // 用于存放按钮级别权限相关内容
    buttons:[],

    // 用于存放当前账号能够访问的路由名称
    routeNames:[],

    // 该数组中会存放当前项目能够访问的所有路由对象
    // 目的就是为了解决左侧动态列表的显示BUG
    routes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION: (state, data) => {
    state.buttons = data.buttons;
    state.routeNames = data.routes;

    // 当前用户并不一定能够访问所有的异步路由,所以需要对asyncRoutes数组进行过滤
    // 最终需要得到一个当前用户能够访问的异步路由组成的新数组
    const newAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes),state.routeNames);

    // 将异步路由注入到router中,让当前用户可以访问
    router.addRoutes([...newAsyncRoutes,...anyRoutes]);

    state.routes = [...constantRoutes,...newAsyncRoutes,...anyRoutes]
  },
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({ username: username.trim(), password: password });
      const { data } = response
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit('SET_TOKEN', data.token)
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token)
    } catch (error) {
      console.log('error')
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data
        // console.log(data)

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_PERMISSION', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions
}

