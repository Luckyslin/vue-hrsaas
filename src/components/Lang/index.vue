<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <div>
      <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh'=== $i18n.locale ">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="'en'=== $i18n.locale ">en</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'Lang',
  methods: {
    changeLanguage(lang) {
      console.log(lang)
      this.$i18n.locale = lang // 设置给本地的i18n插件
      console.log(this.$i18n.locale)
      this.$message.success('切换多语言成功')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dropdown{
margin-right: 10px;
}
</style>
