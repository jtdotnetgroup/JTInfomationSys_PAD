import { getList } from '@/api/menus'

const menus = {
  namespaced: true,
  state: {
    // 菜单列表项，通过后台获取
    items: []

  },
  mutations: {
    updateMenus (state, payload) {
      state.items = payload
    }
  },
  actions: {
    // 根据用户信息获取菜单列表
    getList ({ commit }, user) {
      console.log(user)
      var items = getList(user)
      commit('updateMenus', items)
    }

  }

}

export default menus
