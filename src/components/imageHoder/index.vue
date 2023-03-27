<template>
  <!-- el-image组件 ：https://element.eleme.io/#/zh-CN/component/image -->
  <el-image :src="src" class="img-container" :style="{width, height}">
    <!-- error插槽：设置如果出错，要显示的内容 -->
    <template #error>
      <!-- 静态资源就近维护：把head.jpg这张图放在这个组件的目录下 -->
      <img src="./bigUserHeader.png" alt="">
    </template>
  </el-image>
</template>

<script>
export default {
  name: 'ImageHoder',
  // 定义如何从父组件中接收数据
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '80px'
    },
    height: {
      type: String,
      default: '80px'
    }
  }
}
</script>

<style scoped lang="scss">
// 样式穿透， 有三种写法：
// 1. >>>       在less中使用
// 2. /deep/    在less中使用
// 3. ::v-deep  在scss中使用
  .img-container {
  border-radius: 50%;
  width: 80px;
    height:80px;
::v-deep  img{
    border-radius: 50%;
  width: 100%;
  height: 100%;
  }
}
</style>
