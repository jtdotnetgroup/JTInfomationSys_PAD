import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

Vue.use(axios)

const http = axios.create({
  baseURL: 'http://localhost:21021'
})

export default http
