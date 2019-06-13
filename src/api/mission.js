import axios from '@/lib/axios'
const baseUrl = '/api/services/app/'
// 获取全部数据
export function GetAll (url, params) {
  return axios({
    url: baseUrl + url,
    method: 'get',
    params: params
  })
}
// 获取明细
export function GetMx (url, params) {
  return axios({
    url: baseUrl + url,
    method: 'get',
    params: params
  })
}
// 数据添加
export function DataAdd (url, params) {
  return axios({
    url: baseUrl + url,
    method: 'POST',
    params: params
  })
}

// 数据删除
export function DataDel (url, params) {
  return axios({
    url: baseUrl + url,
    method: 'DELETE',
    params: params
  })
}

// 数据更改
export function DataPUT (url, params) {
  return axios({
    url: baseUrl + url,
    method: 'PUT',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function DataPUT2 (url, params) {
  return axios({
    url: baseUrl + url,
    method: 'PUT',
    params: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 数据添加和修改
export function DataAddOrPUT (url, params) {
  return axios({
    url: baseUrl + url,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 数据添加和修改
export function AddOrPUT (url, params) {
  if (params.id === 0) {
    return DataAdd(url, params)
  } else {
    return DataPUT(url, params)
  }
}
