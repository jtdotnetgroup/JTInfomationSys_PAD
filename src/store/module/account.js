import { login } from '@/api/account'
import { resolve, reject } from 'q'

const account = {
  namespaced: true,
  state: {
    accessToken: '',
    username: '',
    empname: ''
  },
  mutations: {
    UPDATE_ACCESSTOKEN (state, payload) {
      state.accessToken = payload
    },
    UPDATE_USERNAME (state, payload) {
      state.username = payload
    },
    UPDATE_EMPNAME (state, payload) {
      state.empname = payload
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
            reject()
          }
        })
    },
    Logout ({ commit }) {
      commit('UPDATE_ACCESSTOKEN', '')
      commit('UPDATE_USERNAME', '')
      sessionStorage.removeItem('token')
    }
  }
}

export default account
