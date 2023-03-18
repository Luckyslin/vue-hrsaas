<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
    <el-col :span="19">
      <svg-icon icon-class="01" />

      <span>{{ nodeTree.name }}</span>
    </el-col>
    <el-col :span="5">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ nodeTree.manager }}</el-col>
        <!-- 下拉菜单 element -->
        <el-col>
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down" />

            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addDepts">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="company" @click.native="editDepts">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="company" @click.native="deltDepts">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>

export default {

  name: 'VueAdminTemplateMasterDataTloo',
  props: {
    nodeTree: {
      required: true,
      type: Object
    },
    company: {
      required: false,
      type: Boolean
    }

  },
  data() {
    return {

    }
  },

  methods: {

    addDepts() {
      this.$emit('addDepts', this.nodeTree)
    },
    editDepts() {
      this.$emit('editDepts', this.nodeTree)
    },
    deltDepts() {
      this.$emit('deltDepts', this.nodeTree)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
