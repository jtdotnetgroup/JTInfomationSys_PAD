import axios from '@/lib/axios'

export function getList (user) {
  return test(user)
}

function test (user) {
  const data = [
    { path: '/DispatchedWork', icon: './imgs/icons/L_BillList.png', title: '派工任务', secTitle: '待开工' },
    { path: '/Inspection', icon: './imgs/icons/L_BillCheck3.png', title: '完工报检', secTitle: '待检验' },
    { path: '/Report', icon: './imgs/icons/L_Bill.png', title: '完工汇报', secTitle: '待汇报' },
    { path: '/Journaling', icon: './imgs/icons/L_Chart.png', title: '我的报表', secTitle: '报表数' },
    { path: '/Production', icon: './imgs/icons/L_Cart4.png', title: '生产领料', secTitle: '任务数' },
    { path: '/IPQC', icon: './imgs/icons/L_Ruler.png', title: '质量检验', secTitle: '待检验' },
    { path: '/Stock', icon: './imgs/icons/L_Stock.png', title: '库存查询', secTitle: '缺料类' },
    { path: '/BarCode', icon: './imgs/icons/L_Scan.png', title: '条码打印', secTitle: '待检验' }
  ]
  return data
}
