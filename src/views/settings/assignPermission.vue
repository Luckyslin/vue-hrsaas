<template>
  <div>
    <el-tree
      ref="refTree"
      :data="permissionData"
      :props="{label:'name'}"
      show-checkbox
      default-expand-all
      check-strictly
      node-key="id"
    />
    <el-row slot="footer" type="flex" justify="end">
      <el-button size="small" @click="$emit('close')">取消</el-button>
      <el-button size="small" type="primary" @click="hSubmit">确定</el-button>

    </el-row>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { addAssignPerm, getAssign } from '@/api/role'
export default {
  name: 'VueAdminTemplateMasterAssignPermission',
  props: {
    roleId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      permissionData: []
    }
  },
  created() {
    this.loadPermissionList()
    // this.loadGetAssign()
  },
  methods: {

    // 获取权限信息
    async  loadPermissionList() {
      const { success, data: res } = await getPermissionList().catch(Error => Error)
      if (!success) return
      // console.log(res)
      this.permissionData = this.treeData(res, '0')
      // console.log(this.treeData(res, '0'))
    },
    // 将权限信息转化为树状结构
    treeData(res, id) {
      const arr = []
      res.forEach((item) => {
        if (item.pid === id) {
          item.children = this.treeData(res, item.id)
          arr.push(item)
        }
      })
      return arr
    },
    // 数据回填
    async loadGetAssign() {
      const res = await getAssign(this.roleId).catch(e => e)
      if (!res.success) return
      // console.log(res.data.permIds)
      this.$refs.refTree.setCheckedKeys(res.data.permIds)
    },
    // 更新角色权限
    async hSubmit() {
      const permIds = this.$refs.refTree.getCheckedKeys()
      const res = await addAssignPerm({ id: this.roleId, permIds }).catch(e => e)
      console.log(res)
      if (!res.success) return
      // console.log(res)
      this.$emit('close')
      this.$refs.refTree.setCheckedKeys([])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
