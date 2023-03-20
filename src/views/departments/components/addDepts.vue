<template>
  <el-dialog
    :title="title"
    :visible.sync="$store.state.user.isShowDialog"
    width="80%"
    :before-close="btnCancel"
  >
    <el-form ref="deptForm" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in UserPles" :key="item.id" :value="item.username" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="btnCancel">取 消</el-button>
      <el-button type="primary" @click="AddSimple">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getUserSimple, getAddSimple, editSimple, editBranch } from '@/api/departments'

import { mapMutations } from 'vuex'
export default {
  name: 'VueAdminTemplateMasterAddDepts',
  props: {

    // eslint-disable-next-line vue/require-default-prop
    nodeTree: {
      type: Object,
      require: true
    },
    // eslint-disable-next-line vue/require-default-prop
    originList: {
      type: Array

    }
  },

  data() {
    const validCode = (rule, value, callback) => {
      let reslut = this.originList.map(item => item.code)
      if (this.title === '编辑数据') {
        // this.nodeTree.code = ''
        const codeList = this.originList.filter(item => item.id !== this.nodeTree.id)
        // console.log(codeList)
        reslut = codeList.map(item => item.code)
      }
      if (reslut.includes(value)) {
        callback(new Error(value + '已存在'))
      } else {
        callback()
      }
    }
    const validName = (rule, value, callback) => {
      let NameList = this.originList.filter(item => item.pid === this.nodeTree.id).map(item => item.name)
      // console.log(NameList)
      if (this.title === '编辑数据') {
        NameList = this.originList.filter(item => {
          return item.pid === this.nodeTree.pid && item.id !== this.nodeTree.id
        }).map(item => item.name)
        // console.log(NameList)
      }
      if (NameList.includes(value)) {
        callback(new Error(value + '已存在'))
      } else {
        callback()
      }
    }
    return {
      title: '新增数据',
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '该项不能为空', trigger: 'blur' },
          {
            min: 1, max: 30, message: '长度在1-30之间', tigger: 'blur'
          },
          { validator: validName, tigger: 'blur' }
        ],
        code: [{ required: true, message: '该项不能为空', tigger: 'blur' },
          { min: 1, max: 30, message: '长度在1-30之间', tigger: 'blur' },
          { validator: validCode, tigger: 'blur' }
        ],
        manager: [{ required: true, message: '该项不能为空', tigger: 'blur' },
          { min: 1, max: 30, message: '长度在1-30之间', tigger: 'blur' }
        ],
        introduce: [{ required: true, message: '该项不能为空', tigger: 'blur' },
          { min: 1, max: 20, message: '长度在1-300之间', tigger: 'blur' }
        ]
      },
      // 下拉信息
      UserPles: {}
    }
  },

  mounted() {

  },
  async created() {
    this.getUserPles()
  },

  methods: {

    ...mapMutations('user', ['closeDialog']),
    // 关闭dialog
    handleClose() {
      this.closeDialog()
    },
    async getUserPles() {
      const { data: res } = await getUserSimple()
      // console.log(res)
      this.UserPles = res
    },
    // 新增,修改树状结构
    AddSimple() {
      this.$refs.deptForm.validate(async valid => {
        if (!valid) return
        if (this.title === '新增数据') {
          console.log(this.form)
          await getAddSimple({
            ...this.form,
            pid: this.nodeTree.id
          })
        } else {
          // console.log(this.form)
          await editBranch(this.form)
        }
        this.$emit('addBranch')
        this.closeDialog()
        this.$refs.deptForm.resetFields()
      })
    },
    // 取消按钮
    btnCancel() {
      this.closeDialog()
      this.$refs.deptForm.resetFields()
    },
    // 编辑弹窗数据
    async  geteditSimple(id) {
      const { data: res } = await editSimple(id)
      this.form = res
      // console.log(res)
    }

  }
}

</script>

<style lang="scss" scoped>

</style>
