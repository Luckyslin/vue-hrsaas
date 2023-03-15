import { getToken, removeToken, setToken } from '@/utils/auth'
import { login, getInfo, getAvatar } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    userInfo: {},
    userRoute: ''
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

      // 对象合并
      ctx.commit('updataInfo', { ...res, ...avatar })
    }
    // 获取连接
  }
}
// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }

