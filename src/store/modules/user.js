import { getToken, removeToken, setToken } from '@/utils/auth'
import { login, getInfo, getAvatar } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    userInfo: {},
    userRoute: '',
    isShowDialog: false
  },
  mutations: {
    // 存储token到state中
    updataToken(state, token) {
      state.token = token
      setToken(state.token)
    },
    // 退出登录操作
    remove(state) {
      state.token = ''
      removeToken()
      state.userInfo = ''
    },

    // 存储用户信息daostate中
    updataInfo(state, payload) {
      state.userInfo = payload
    },
    // 存储链接
    setRoute(state, payload) {
      state.userRoute = payload
      return state.userRoute
    },
    // 控制dialog
    closeDialog(state) {
      state.isShowDialog = false
    },
    openDialog(state) {
      state.isShowDialog = true
    }
  },
  actions: {
    // 获取token
    async userLogin(ctx, payload) {
      const { data: res } = await login(payload)
      ctx.commit('updataToken', res)
    },
    // 获取用户信息
    async getProfile(ctx) {
      const { data: res } = await getInfo()
      const { data: avatar } = await getAvatar(res.userId)
      // console.log(res.roles)
      // 对象合并
      ctx.commit('updataInfo', { ...res, ...avatar })
      return res.roles
    }

  }
}
