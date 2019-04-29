import axios from '@/lib/axios'

export function getList (user) {
  // axios({

  // }).then(res => {
  //   return res.data
  // })
  return test(user)
}

function test (user) {
  const data = [
    { path: '/DispatchedWork', icon: './imgs/icons/L_BillList.png', title: '派工单', secTitle: '待派工' },
    { path: '/test', icon: './imgs/icons/L_BillCheck3.png', title: '完工报科', secTitle: '待检验' },
    { path: '/test', icon: './imgs/icons/L_Bill.png', title: '完工汇报', secTitle: '待汇报' },
    { path: '/test', icon: './imgs/icons/L_Chart.png', title: '我的报表', secTitle: '报表数' },
    { path: '/test', icon: './imgs/icons/L_Cart4.png', title: '生产领料', secTitle: '任务数' },
    { path: '/test', icon: './imgs/icons/L_Ruler.png', title: '质量检验', secTitle: '待检验' },
    { path: '/test', icon: './imgs/icons/L_Stock.png', title: '库存查询', secTitle: '物料类' },
    { path: '/test', icon: './imgs/icons/L_Scan.png', title: '条码打印', secTitle: '待检验' }
  ]

  return data
}
