import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'
import { constantRouterMap } from './router.config.js'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: constantRouterMap
})



router.beforeEach((to, from, next) => {

  console.log('routes',router)

  var token = store.getters.token
  
  if (token) {
    //已登录
    if (to.path === '/login') {
      //如果访问的页面是登录页面，则跳转到首页
      next({ path: '/' })
    }

    //检查权限
    if (!store.getters.permissions) {
      //如果还没有获取权限信息，则获取权限信息
      store.dispatch('account/GetInfo')
        .then(res => {
          const  permissions  = res.auth.grantedPermissions
          //根据权限信息，生成动态路由
          store.dispatch('GenerateRoutes', { permissions })
            .then(() => {
              const addRoutes=store.getters.addRouters;
              router.addRoutes(addRoutes)
              //当前要访问的页面是否有重定向，如果有则跳转到重定向路由，没有则跳转到to页面
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if(to.path==redirect){
                next({...to,replace:true})
              }
              else{
                next({path:redirect})
              }
            })
        })
        .catch(err => {
          console.log(err)
          Message.error('请求用户信息异常')
        })
    } else {
      next()
    }

  } else {
    console.log('token:',token)
   //未登录
   if(to.path==='/login'){
     next()
   }else{
     next({path:'/login',query: { redirect: to.fullPath }})
   }
  }
})


export default router;