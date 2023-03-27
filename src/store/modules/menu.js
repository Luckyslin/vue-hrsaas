import { constantRoutes } from '@/router/index'
// console.log(constantRoutes)
export default {
  namespaced: true,
  state: {
    menuList: [...constantRoutes]
  },
  mutations: {
    setMenuList(state, playload) {
      state.menuList = [...constantRoutes, ...playload]
    }
  }
}
