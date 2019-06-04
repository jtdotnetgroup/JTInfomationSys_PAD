import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import { Message } from 'element-ui'
import { store } from '../store.js'
// Vue.use(axios)
// Vue.use(Vuex)
Vue.prototype.$ajax = axios
//
var url = window.location.host
var baseURL = ''
if (url.indexOf('http://222.72.134.71') >= 0) {
  baseURL = 'http://222.72.134.71:8093'
} else if (url.indexOf('192.168.1') >= 0) {
  // baseURL = 'http://192.168.1.177:8088'
  baseURL = 'http://192.168.1.215:8099'
} else if (url.indexOf('localhost') >= 0) {
  // 开发环境
  baseURL = 'http://localhost:21021'
}
// console.log(baseURL)
const http = axios.create({
  baseURL: baseURL,
  timeout: 20000
})

//
const err = (error) => {
  console.log(error)
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      console.log('抱歉，你没有权限操作！')
      Message.error('抱歉，你没有权限操作！')
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      console.log('未授权,请登录')
      Message.error('未授权,请登录')
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
    if (error.response.status === 500) {
      console.log('抱歉，服务器处理请求异常')
      Message.error('抱歉，服务器处理请求异常')
    }
    if (error.response.status === 400) {
      console.log(data.error.details)
      Message.error(data.error.details)
    }
  }
  return Promise.reject(error)
}
//
http.interceptors.request.use(function (config) {
  // console.log('dsaasd')

  var token = sessionStorage.getItem('token')
  if (token) {
    sessionStorage.setItem('token', token)
    // console.log('interceptors' + sessionStorage.token)
    config.headers.common['Authorization'] = 'Bearer ' + token
    config.headers.common['.AspNetCore.Culture'] = 'zh-Hans'
    // config.headers['Access-Token'] = sessionStorage.token
  } else {
    // console.log('请重新登录！')
  }
  return config
}, err)

// // 请求拦截
// axios.interceptors.request.use(
//   config => {
//     config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
//     config.timeout = 6000
//     let token = store.state.account.accessToken
//     let csrf = store.getters.csrf

//     if (token) {
//       config.headers = {
//         'access-token': token,
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     }
//     if (config.url === 'refresh') {
//       config.headers = {
//         'refresh-token': sessionStorage.getItem('refresh_token'),
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

export default http
