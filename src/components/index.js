import pageTool from './pageTool'
import uploadImage from './uploadImg/uploadImg'
import ImageHoder from './imageHoder/index'
import radar from './radar/index'
import Lang from './Lang/index'
import ScreenFull from './screenfull/index'
export default {
  install(Vue) {
    // console.log(Vue)
    // console.log(pageTool.name)
    Vue.component(pageTool.name, pageTool)
    Vue.component(uploadImage.name, uploadImage)
    Vue.component(ImageHoder.name, ImageHoder)
    Vue.component(radar.name, radar)
    Vue.component(Lang.name, Lang)
    Vue.component(ScreenFull.name, ScreenFull)
  }
}
