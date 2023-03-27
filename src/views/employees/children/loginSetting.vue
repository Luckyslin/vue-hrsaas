<template>
  <div class="login-setting">
    <el-form ref="userForm" :model="userInfo" label-width="120px" style="margin-left: 120px; margin-top: 30px" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="userInfo.username" style="width:300px" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password" style="width:300px" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="hUpdateUserInfo">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAvatar, updataUserInfo } from '@/api/user'

export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }

    }
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    // 数据回填
    async loadUserInfo() {
      console.log(this.$route.params)
      const { data: res } = await getAvatar(this.$route.params.id)
      this.userInfo = res
    },
    // 更新用户信息
    async  hUpdateUserInfo() {
      const valid = await this.$refs.userForm.validate().catch(e => e)
      if (!valid) return
      const { success } = await updataUserInfo(this.userInfo).catch(e => e)
      console.log(success)
      if (!success) return
    }
  }
}
</script>
