export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue')
  }
]

export const asyncRouterMap = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Main/index.vue')
  },

  {
    path: '/DispatchedWork',
    name: 'DispatchedWork',
    meta: { permission: 'TouchPad.DispatchedWork', icon: './imgs/icons/L_BillList.png', title: '派工任务', secTitle: '待开工', key: 'PGRW', count: 0 },
    component: () => import('../views/DispatchedWork/index.vue')
  },
  {
    path: '/Inspection',
    name: 'Inspection',
    meta: { permission: 'TouchPad.Inspection', icon: './imgs/icons/L_BillCheck3.png', title: '完工报检', secTitle: '待检验', key: 'WGJY', count: 0 },
    component: () => import('../views/Inspection/index.vue')
  },
  {
    path: '/Report',
    name: 'Report',
    meta: { permission: 'TouchPad.Report', icon: './imgs/icons/L_Bill.png', title: '完工汇报', secTitle: '待汇报', key: 'WGHB', count: 0 },
    component: () => import('../views/Report/index.vue')
  }, {
    path: '/Journaling',
    name: 'Journaling',
    meta: { permission: 'TouchPad.Journaling', icon: './imgs/icons/L_Chart.png', title: '我的报表', secTitle: '报表数', key: 'WDBB', count: 0 },
    component: () => import('../views/Journaling/index.vue')
  }, {
    path: '/Production',
    name: 'Production',
    meta: { permission: 'TouchPad.Production', icon: './imgs/icons/L_Cart4.png', title: '生产领料', secTitle: '任务数', key: 'SCLL', count: 0 },
    component: () => import('../views/Production/index.vue')
  },
  {
    path: '/IPQC',
    name: 'IPQC',
    meta: { permission: 'TouchPad.IPQC', icon: './imgs/icons/L_Ruler.png', title: '质量检验', secTitle: '待检验', key: 'ZLJY', count: 0 },
    component: () => import('../views/IPQC/Testing.vue')
  },
  {
    path: '/IPQC/Report',
    name: 'IPQCReport',
    component: () => import('../views/IPQC/Report.vue')
  },
  {
    path: '/IPQC/InspectionDetails',
    name: 'IPQCInspectionDetails',
    component: () => import('../views/IPQC/InspectionDetails.vue')
  },
  {
    path: '/Stock',
    name: 'Stock',
    meta: { permission: 'TouchPad.Stock', icon: './imgs/icons/L_Stock.png', title: '库存查询', secTitle: '缺料类', key: 'KCCX', count: 0 },
    component: () => import('../views/Stock/index.vue')
  },
  {
    path: '/BarCode',
    name: 'BarCode',
    meta: { permission: 'TouchPad.BarCode', icon: './imgs/icons/L_Scan.png', title: '条码打印', secTitle: '待检验', key: 'TMDY', count: 0 },
    component: () => import('../views/BarCode/index.vue')
  }
]
