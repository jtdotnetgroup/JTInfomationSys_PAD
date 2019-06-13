export default store = {
  state: {

  },
  mutations: {
    updateValue (state, payload) {
      state.value = payload
    }
  },
  actions: {
    updateValue ({ commit }, payload) {
      commit('updateValue', payload)
    }
  }
}
