import axios from '@/lib/axios'
// 获取全部数据
export function GetAll (url, params) {
  return axios({
    url: url,
    method: 'get',
    params: params
  })
}
// 获取明细
export function GetMx (url, params) {
  return axios({
    url: url,
    method: 'get',
    params: params
  })
}
