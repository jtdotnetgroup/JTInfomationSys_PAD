import Vue from 'vue'
import Vuex from 'vuex'

import menus from './store/module/menus'
import account from './store/module/account'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    menus,
    account

  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})

export default store
