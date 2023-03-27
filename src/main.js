import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// Vue.directive('allow', {
//   inserted: function(el, binding) {
//     const points = store.state.user.userInfo.roles.points
//     console.log(points)
//     if (!points.includes(binding.value)) {
//       el.remove()
//     }
//   }
// })
// 使用自定义指令实现按钮权限控制
Vue.directive('allow', {
  inserted: function(el, binding) {
    const poitns = store.state.user.userInfo.roles.points
    // console.log(poitns)
    if (!poitns.includes(binding.value)) {
      el.remove()
    }
  }
})
// Vue.directive('show', {
//   inserted: function(el, binding) {
//     console.log(el)
//     // console.log(poitns)
//   }
// })
import page from '@/components/index'
import i18n from '@/lang'
Vue.use(page)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
