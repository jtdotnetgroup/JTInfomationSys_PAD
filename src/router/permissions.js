import Vue from 'vue'
import router from './router'
import store from '@/store.js'

router.beforeEach((to, from, next) => {
  console.log(to)
  var token = store.getters.token
  if (token) {
    next()
  } else {
    if (to.path !== '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})
