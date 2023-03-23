<template>
  <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker v-model="formData.timeOfEntry" value-format="yyyy-MM-dd" style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select
        v-model="formData.formOfEmployment"
        style="width:50%"
        placeholder="请选择"
      >
        <el-option
          v-for="item in hireType"
          :key="item.id"
          :value="item.id"
          :label="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="hFocus" />
      <el-tree v-if="showTree" :data="depts" :props="{label:'name'}" style="width:50%" @node-click="handleNodeClick" />
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker v-model="formData.correctionTime" style="width:50%" value-format="yyyy-MM-dd" placeholder="请选择转正时间" />
    </el-form-item>

    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import employees from '@/constant/employees'
import { getDepartment } from '@/api/departments'
import { addEmployees } from '@/api/employees'
export default {

  props: {

  },
  data() {
    return {
      hireType: employees.hireType,
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      },
      depts: [],
      showTree: false

    }
  },
  created() {

  },
  methods: {
    async  submit() {
      const valid = await this.$refs.addForm.validate()
      if (!valid) return
      // 做添加
      await addEmployees(this.formData).catch(e => e)
      // console.log(res)
      this.$refs.addForm.resetFields()
      this.$emit('submit')
    },
    // 取消
    async close() {
      this.$emit('close')
      await this.$nextTick()
      this.$refs.addForm.resetFields()
    },
    // 获取部门数据
    async loadDepartment() {
      console.log(this.depts.length)
      if (this.depts.length > 0) return
      console.log(this.depts.length)
      console.log(111)
      const { data: res } = await getDepartment().catch(e => e)

      res.depts.shift()
      // console.log(res)
      this.depts = this.treeData(res.depts, '')
    },
    // 将数据转变为树状结构
    treeData(depts, id) {
      const arr = []
      depts.forEach(item => {
        if (item.pid === id) {
          item.children = this.treeData(depts, item.id)
          arr.push(item)
        }
      })
      return arr
    },

    // const arr = depts.filter(item => item.pid === id)
    // arr.forEach(item => {
    //   item.children = depts.filter(it => it.pid === item.id)
    // })
    // console.log(arr)
    // return arr
    // 点击选择部门显示tree
    async  hFocus() {
      await this.loadDepartment()
      this.showTree = true
    },
    // 将tree数据渲染到input中
    handleNodeClick(data) {
      // console.log(data)
      if (data.children.length > 0) return
      this.formData.departmentName = data.name
      this.showTree = false
    }

  }
}

</script>
