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
    path: '/IPQC/Testing',
    name: 'IPQC',
    component: () => import('../views/IPQC/Testing.vue')
  },
  {
    path: '/IPQC/Report',
    name: 'IPQC',
    component: () => import('../views/IPQC/Report.vue')
  }
]

export default routes
