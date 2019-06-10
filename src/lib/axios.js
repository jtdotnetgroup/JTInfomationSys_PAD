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
  if (error.response) {
    const data = error.response.data
    const result = data.error
    const token = sessionStorage.getItem('token')
    if (error.response.status === 403) {
      Message.error('抱歉，你没有权限操作！')
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
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
      Message.error(result.details)
    }
    if (error.response.status === 400) {
      Message.error(result.details)
    }
  }
  return Promise.reject(error)
}

http.interceptors.request.use(config => {
  var token = sessionStorage.getItem('token')
  config.headers.common['.AspNetCore.Culture'] = 'zh-Hans'
  if (token) {
    sessionStorage.setItem('token', token)
    config.headers.common['Authorization'] = 'Bearer ' + token
  }
  return config
}, err)

http.interceptors.response.use(config => {
  return config
}, err)

export default http
