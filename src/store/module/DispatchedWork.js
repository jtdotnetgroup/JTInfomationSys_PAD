const store = {
  state: {
    activeTab: '',
    columns: {}
  },
  mutations: {
    UPDATE_ACTIVETAB (state, payload) {
      state.activeTab = payload
    }
  },
  actions: {
    ChangeTab ({ commit }, payload) {

    }
  }
}

export default store
