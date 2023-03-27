import Vue from 'vue'
import store from '@/store'
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import router from '@/router'
import { message } from './message'
const service = axios.create(
  {
    baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: 'http://ihrm-java.itheima.net',
    timeout: 5000
  }
)
// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
service.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const result = response.data.message
  console.log(response)
  console.log(response.data)
  console.log(response.data.success)
  if (response.data.success) {
    if (message.includes(result)) {
      Vue.prototype.$message.success(result)
    }
    return response.data
  } else {
    return Promise.reject(new Error(Vue.prototype.$message.error(response.data.message)))
  }
}, function(error) {
  // 对响应错误做点什么
  if (error.response.data.code === 10002) {
    store.commit('user/remove')
    router.push({ path: '/login',
      query: {
        // return_url: store.state.user.userRoute 取出vuex中的值来传参
        return_url: location.hash.substring(1) // 采用location.hash获取地址栏全部信息在截取#后面的内容
      }
    })
    // console.log(location.hash.substring(1))
    Vue.prototype.$message.error(error.message)
    return Promise.reject(error)
  }
})
// 创建一个axios的实例
// service.interceptors.request.use() // 请求拦截器
// service.interceptors.response.use() // 响应拦截器
export default service // 导出axios实例

