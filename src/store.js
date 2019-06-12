import Vue from 'vue'
import Vuex from 'vuex'

import menus from './store/module/menus'
import account from './store/module/account'
import permissions from './store/module/permissions'
import TaskQty from './store/module/TaskQty'
import getters from './store/getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    menus,
    account,
    permissions,
    TaskQty
  },
  state: {
  },
  mutations: {

  },
  actions: {

  },
  getters
})

// prototype
export default store
