import { login, GetUserInfo } from '@/api/account'
import { resolve, reject } from 'q'

const account = {
  namespaced: true,
  state: {
    accessToken: sessionStorage.getItem('token'), // 从localStoreage中读取
    username: sessionStorage.getItem('username'), // 从localStoreage中读取
    empname: '',
    permissions: ''
  },
  mutations: {
    UPDATE_ACCESSTOKEN (state, payload) {
      state.accessToken = payload
      sessionStorage.setItem('token', payload)// 写入localStoreage中，解决刷新后由于token丢失重回到登录页面的问题
    },
    UPDATE_USERNAME (state, payload) {
      state.username = payload
      sessionStorage.setItem('username', payload)
    },
    UPDATE_EMPNAME (state, payload) {
      state.empname = payload
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },
  actions: {
    Login ({ commit }, payload) {
      login(payload.username, payload.password)
        .then(res => {
          var data = res.data
          if (!data.error) {
            sessionStorage.setItem('token', data.result.accessToken)
            commit('UPDATE_ACCESSTOKEN', data.result.accessToken)
            commit('UPDATE_USERNAME', payload.username)
            resolve()
          } else {
            reject(data)
          }
        }).catch(err => {
          reject(err)
        })
    },
    Logout ({ commit }) {
      commit('UPDATE_ACCESSTOKEN', '')
      commit('UPDATE_USERNAME', '')
      commit('SET_PERMISSIONS', {})
      sessionStorage.removeItem('token')
    },

    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        GetUserInfo().then(response => {
          const result = response.data.result
          console.log(result)
          if (result.auth.grantedPermissions) {
            commit('SET_PERMISSIONS', result.auth.grantedPermissions)
          } else {
            reject(new Error('grantedPermissions must array'))
          }
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default account
