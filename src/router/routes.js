const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Main/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
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
    name: 'IPQC',
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

export default routes
