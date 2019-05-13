import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import { account } from '@/store/module/account'
Vue.use(axios)

const http = axios.create({
  baseURL: 'http://localhost:21021/api/services/app/'
})

axios.interceptors.request.use(function (config) {
  console.log('hello2')
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 请求拦截
axios.interceptors.request.use(
  config => {
    config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
    config.timeout = 6000
    let token = store.state.account.accessToken
    let csrf = store.getters.csrf

    if (token) {
      config.headers = {
        'access-token': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    if (config.url === 'refresh') {
      config.headers = {
        'refresh-token': sessionStorage.getItem('refresh_token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
