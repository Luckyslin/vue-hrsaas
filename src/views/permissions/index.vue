<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="hAdd(1,0)">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button v-if="row.type===1" type="text" @click="hAdd(2,row.id)">添加</el-button>
              <el-button type="text" @click="hEdit(row.id)">编辑</el-button>
              <el-button type="text" @click="hDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog :visible.sync="showDialog" :title="title" @closed="hClosed">
      <!-- 表单内容 -->
      <el-form ref="formData" label-width="100px" :model="formData" :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="权限启用" prop="enVisible">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="hSubmit">确定</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>
<script>
import { addPermission, delPermission, getPermissionDetail, getPermissionList, updatePermission } from '@/api/permission'

export default {

  data() {
    return {
      list: [],
      title: ' 添加权限',
      showDialog: false, // 是否显示弹层
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      },
      rules: {
        name: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }

    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {
    // 获取权限表格信息
    async loadPermissionList() {
      const res = await getPermissionList().catch(e => e)
      if (!res.success) return
      // console.log(res)
      // console.log(this.TreeData(res.data, '0'))
      this.list = this.TreeData(res.data, '0')
    },
    // 封装将表格信息转换为树状结构
    TreeData(res, id) {
      const arr = []
      res.forEach((item) => {
        if (item.pid === id) {
          item.children = this.TreeData(res, item.id)
          arr.push(item)
        }
      })
      return arr
    },
    hAdd(type, id) {
      this.title = '添加权限'
      this.formData.type = type
      this.formData.pid = id
      this.showDialog = true
    },
    // 添加权限,编辑权限
    async  hSubmit() {
      const valid = await this.$refs.formData.validate().catch(e => e)
      if (!valid) return
      if (this.title === '添加权限') {
        const res = await addPermission(this.formData).catch(e => e)
        if (!res.success) return
      } else {
        const res = await updatePermission(this.formData).catch(e => e)
        if (!res.success) return
      }
      this.showDialog = false
      this.loadPermissionList()
      this.$store.dispatch('user/getProfile')
    },
    // 关闭dialog
    hClosed() {
      // this.formData.enVisible = '0'
      this.$refs.formData.resetFields()
    },
    // 删除权限
    async  hDel(id) {
      const res = await delPermission(id).catch(e => e)
      if (!res.success) return
      this.loadPermissionList()
    },
    async hEdit(id) {
      this.title = '编辑权限'
      const res = await getPermissionDetail(id).catch(e => e)
      if (!res.success) return
      this.showDialog = true
      this.formData = res.data
    }

  }
}
</script>
<style lang="scss" scoped>
//  ::v-deep .el-dialog__header{
//   background-color: #409EFF;
//   .el-dialog__title{
//     color: #fff;
//   }
//     .el-dialog__close{
//       color: #fff;
//     }
// }
</style>
