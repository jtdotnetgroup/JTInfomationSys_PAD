import Vue from 'vue'
import Router from 'vue-router'
import store from '../store.js'

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
    },{
      path: '/IPQC/InspectionDetails',
      name: 'IPQCInspectionDetails',
      component: () => import('../views/IPQC/InspectionDetails.vue')
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

router.beforeEach((to, from, next) => {
  // console.log(to)
  var token=store.getters.token
  if(token){
    next();
  }else{
    
    if(to.path!=='/login'){
      next({path:'/login'})
    }else{
      next();
    }
  }
  
  
})

export default router;