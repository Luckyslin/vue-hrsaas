<template>
  <!-- // 分配角色 -->
  <div>
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>

    </el-checkbox-group>

    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="hSubmit">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getRole } from '@/api/role'
import { getAvatar } from '@/api/user'
import { addAssignRoles } from '@/api/employees'
export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roleIds: [],
      roles: []
    }
  },
  created() {
    this.loadGetRole()
    // this.loadGetAvatar()
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    // 获取所有角色权限
    async loadGetRole() {
      const res = await getRole().catch(e => e)
      if (!res.success) return
      this.roles = res.data.rows
      // console.log(res)
    },
    // 根据用户id获取对应角色权限
    async loadGetAvatar() {
      const res = await getAvatar(this.userId).catch(e => e)
      if (!res.success) return
      this.roleIds = res.data.roleIds

      // console.log(res)
    },
    async hSubmit() {
      const res = await addAssignRoles({ id: this.userId, roleIds: this.roleIds }).catch(e => e)
      console.log(res)
      if (!res.success) return
      this.$emit('close')
    }
  }
}
</script>
