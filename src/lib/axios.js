import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import { Message } from 'element-ui'
import { store } from '@/store'
// Vue.use(axios)
Vue.use(Vuex)
Vue.prototype.$ajax = axios
//
var url = window.location.host
var baseURL = ''
if (url.indexOf('http://222.72.134.71') >= 0) {
  baseURL = 'http://222.72.134.71:8093'
} else if (url.indexOf('192.168.1.207') >= 0) {
  baseURL = 'http://192.168.1.207:21021'
} else if (url.indexOf('localhost') >= 0) {
  // 开发环境
  baseURL = 'http://localhost:21021'
}
// console.log(baseURL)
const http = axios.create({
  baseURL: baseURL + '/api/services/app/'
})

axios.interceptors.request.use(function (config) {
  // console.log('interceptors' + sessionStorage.token)
  if (sessionStorage.token) {
    console.log('interceptors' + sessionStorage.token)
    config.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
    config.headers.common['.AspNetCore.Culture'] = 'zh-Hans'
    // config.headers['Access-Token'] = sessionStorage.token
  }
  // console.log('interceptors:' + this.$store.state.token)
  // console.log(account.state.accessToken)
  // config.headers['Authorization'] = account.state.accessToken
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
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
