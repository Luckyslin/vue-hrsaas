<template>
  <!-- 放置一个图标 -->
  <div style="display:inline-block">
    <!-- <svg-icon v-if="isFullscreen" icon-class="exit-fullscreen" class="fullscreen" @click="hFull" />
    <svg-icon v-else icon-class="fullscreen" class="fullscreen" @click="hFull" /> -->

    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" class="fullscreen" @click="hFull" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      isFullscreen: false
    }
  },
  created() {
    screenfull.on('change', () => {
      console.log('当前是否是全屏', screenfull.isFullscreen)
      this.isFullScreen = screenfull.isFullscreen
    })
  },
  methods: {
    async hFull() {
      screenfull.toggle()

      // await this.$nextTick()
      // this.isFullscreen = screenfull.isFullscreen

      this.isFullscreen = !screenfull.isFullscreen
      console.log(screenfull.isFullscreen)
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
  margin-right: 15px;
}
</style>
