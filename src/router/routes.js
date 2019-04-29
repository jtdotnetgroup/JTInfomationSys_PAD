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
  }
]

export default routes
