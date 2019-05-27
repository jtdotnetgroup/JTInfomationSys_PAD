import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Main/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/DispatchedWork',
      name: 'DispatchedWork',
      component: () => import('../views/DispatchedWork/index.vue')
    },
    {
      path: '/Inspection',
      name: 'Inspection',
      component: () => import('../views/Inspection/index.vue')
    },
    {
      path: '/Report',
      name: 'Report',
      component: () => import('../views/Report/index.vue')
    }, {
      path: '/Journaling',
      name: 'Journaling',
      component: () => import('../views/Journaling/index.vue')
    }, {
      path: '/Production',
      name: 'Production',
      component: () => import('../views/Production/index.vue')
    },
    {
      path: '/IPQC',
      name: 'IPQC',
      component: () => import('../views/IPQC/Testing.vue')
    },
    {
      path: '/IPQC/Report',
      name: 'IPQCReport',
      component: () => import('../views/IPQC/Report.vue')
    },
    {
      path: '/Stock',
      name: 'Stock',
      component: () => import('../views/Stock/index.vue')
    },
    {
      path: '/BarCode',
      name: 'BarCode',
      component: () => import('../views/BarCode/index.vue')
    }

  ]
})

// router.beforeEach((to, from, next) => {
//   // console.log(to)
//   var token = sessionStorage.getItem('token')
//   if (token) {  // 通过vuex state获取当前的token是否存在
//     next();
//   }
//   else {
//     next({
//       name: 'login'
//     })
//   }
// })

export default router;