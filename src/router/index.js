import Vue from 'vue'
import Router from 'vue-router'
// 引入多个动态路由模块
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permissions'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/settings'
import socialRouter from './modules/social_securitys'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 动态路由
export const asyncRoutes = [
  departmentsRouter,
  settingRouter,
  employeesRouter,
  permissionRouter,
  approvalsRouter,
  attendancesRouter,
  salarysRouter,
  socialRouter
]
// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName:"login"*/'@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName:"404"*/'@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName:"dashboard"*/'@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }

]
const createRouter = () => new Router({
  mode: 'history', // require service support

  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()

  router.matcher = newRouter.matcher // reset router
}

export default router
