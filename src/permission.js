import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store'
import getPageTitle from './utils/get-page-title'
// 前置导航守卫
router.beforeEach(async(to, from, next) => {
  // 存储to.path的参数
  store.commit('user/setRoute', to.path)

  const token = store.state.user.token
  NProgress.start()
  // 创建白名单数组以后好维护
  const whiteList = ['/login', '/404']
  // 判断有没有token,有token不能跳转到登录页
  if (token) {
    // 判断如果userInfo没有数据才发请求
    const userId = store.getters.userId
    if (!userId) {
      await store.dispatch('user/getProfile')
    }

    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // console.log(router.currentRoute.fullPath)
      next()
    }
  } else {
    // 如果没有token判断是否去白名单,是则放行否则跳转到登录
    if (whiteList.includes(to.path)) {
      next()
      store.dispatch('user/getRoute')
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
// 后置导航守卫
router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title)
  NProgress.done()
})

// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'

// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
