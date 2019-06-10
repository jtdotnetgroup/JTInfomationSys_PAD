import { GetAll } from '@/api/mission.js'
//
const store = {
  //
  state: {
    TaskQty: []
  },
  //
  mutations: {
    // 设置
    SET_TASKQTY: (state, payload) => {
      state.TaskQty = payload
    }
  },
  //
  actions: {
    GetAllTaskQty ({ commit }, params) {
      GetAll('Common/GetTaskQty', { StrKey: params.StrKey }).then(res => {
        if (res.data.success) {
          var result = res.data.result
          commit('SET_TASKQTY', result)
        }
      })
    }
  }
}
// this.$store.dispatch('GetAllTaskQty', params)
export default store
