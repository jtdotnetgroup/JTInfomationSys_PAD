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
// 数据添加
export function DataAdd (url, params) {
  return axios({
    url: url,
    method: 'POST',
    params: params
  })
}

// 数据删除
export function DataDel (url, params) {
  return axios({
    url: url,
    method: 'DELETE',
    params: params
  })
}

// 数据更改
export function DataPUT (url, params) {
  return axios({
    url: url,
    method: 'PUT',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 数据添加和修改
export function DataAddOrPUT (url, params) {
  return axios({
    url: url,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
