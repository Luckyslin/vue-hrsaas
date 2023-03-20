import pageTool from './pageTool'
export default {
  install(Vue) {
    // console.log(Vue)
    // console.log(pageTool.name)
    Vue.component(pageTool.name, pageTool)
  }
}
