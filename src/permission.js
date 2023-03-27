import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store'
import getPageTitle from './utils/get-page-title'
import { asyncRoutes } from '@/router/index'
// 前置导航守卫
router.beforeEach(async(to, from, next) => {
  // 方法1:存储to.path的参数,使用编程式导航传参,
  // 实现页面退出登录重新登录跳转到原来页面
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
      const roles = await store.dispatch('user/getProfile')
      // 获取用户中menus遍历得到的包含的权限
      const filterRouter = asyncRoutes.filter(item => {
        return roles.menus.includes(item.children[0].name)
      })
      // console.log(filterRouter)
      // 刷新浏览器会发现跳到了404页面,把404页面放到数组最后
      filterRouter.push({ path: '*', redirect: '/404', hidden: true })
      // 添加权限
      router.addRoutes(filterRouter)
      // 将需要加载的权限放到vuex中
      store.commit('menu/setMenuList', filterRouter)
      const str = to.path
      // 解决刷新出现的白屏bug
      next({
        ...to, // next({ ...to })的目的,是保证路由添加完了再进入页面 (可以理解为重进一次)
        replace: true // 重进一次, 不保留重复历史
      })
      // 解决没有路由跳转至404判断用户有没有权限跳转到路由传递参数的页面没有就跳转到首页
      if (!roles.menus.includes(str.substring(1))) {
        next('/dashboard')
      }
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

