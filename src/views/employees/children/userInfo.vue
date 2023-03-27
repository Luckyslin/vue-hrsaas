<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form ref="userForm" label-width="220px" :model="userInfo" :rules="rules">
      <!--手机 -->

      <el-form-item label="手机">
        <el-input v-model="userInfo.mobile" style="width:220px" disabled />
      </el-form-item>

      <!-- 工号 入职时间 -->

      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <!-- 员工照片 -->

      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <uploadImage v-model="userInfo.staffPhoto" />

      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="hupdataUserInfo">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAvatar, updataUserInfo } from '@/api/user'
export default {
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        mobile: '',
        timeOfEntry: '',
        staffPhoto: ''
      },
      rules: {
        timeOfEntry: [{ required: true, meaage: '内容不能为空', trigger: 'blur' }]
      }

    }
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    async  loadUserInfo() {
      const res = await getAvatar(this.userId).catch(e => e)

      if (!res.success) return
      this.userInfo = res.data
      console.log(this.userInfo)
    },
    async  hupdataUserInfo() {
      const valid = await this.$refs.userForm.validate().catch(e => e)
      if (!valid) return

      const { success } = await updataUserInfo(this.userInfo).catch(e => e)
      if (!success) return
    }
  }
}
</script>

<style scoped lang="scss">
  .user-info{
    padding-top:20px;
  }
</style>

