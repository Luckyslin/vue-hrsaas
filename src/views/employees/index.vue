<template>
  <div class="employees-container">
    <div class="app-container">
      <pageTool>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </pageTool>

      <el-card style="margin-top: 10px;">
        <el-table border :data="employees">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column
            label="工号"
            prop="workNumber"
          />
          <el-table-column
            label="聘用形式"
          >
            <template v-slot="{row}">

              {{ formatEmployment(row) }}
            </template>
          </el-table-column>
          <el-table-column
            label="部门"
            prop="departmentName"
          />
          <el-table-column
            label="入职时间"
            prop="timeOfEntry"
          />

          <el-table-column label="操作" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getEmpployees } from '@/api/employees'
import empployees from '@/constant/employees'
// 枚举将数组对象转换为对象
const obj = {}
empployees.hireType.forEach(item => {
  obj[item.id] = item.value
})
// const obj = empployees.hireType.reduce((acc, item) => {
//   acc[item.id] = item.value
//   return acc
// }, {})
// console.log(obj)
export default {

  data() {
    return {
      pageParams: {
        page: 1,
        size: 10
      },
      total: 0,
      employees: []
    }
  },
  created() {
    this.loadEmpployess()
  },
  methods: {
    // 获取数据渲染
    async loadEmpployess() {
      const { data: res } = await getEmpployees(this.pageParams).catch(e => console.log(e))

      this.employees = res.rows
      this.total = res.total
    },
    // 枚举聘用形式
    formatEmployment(row) {
      return obj[row.formOfEmployment]
    }
  }

}
</script>
