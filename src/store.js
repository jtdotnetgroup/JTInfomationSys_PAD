import Vue from 'vue'
import Vuex from 'vuex'

import menus from './store/module/menus'
import account from './store/module/account'
import permissions from './store/module/permissions'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    menus,
    account,
    permissions
  },
  state: {
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    token: state => state.account.accessToken,
    permissions: state => state.account.permissions,
    addRouters: state => state.permissions.addRouters
  }
})

// prototype
export default store
