<template>
  <div class="employees-container">
    <div class="app-container">
      <pageTool>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <template #right>
          <el-button v-allow="'import_excel'" type="warning" size="small" @click="$router.push('/employees/import')">excel导入</el-button>
          <el-button v-allow="'export_excel'" type="danger" size="small" @click="handleDownload">excel导出</el-button>
          <el-button type="primary" size="small" @click="addEmployees">新增员工</el-button>
        </template>
      </pageTool>

      <el-card style="margin-top: 10px;">
        <el-table border :data="employees">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="头像" width="120" align="center">
            <template v-slot="{row}">
              <ImageHoder :src="row.staffPhoto" />
            </template>
          </el-table-column>
          <el-table-column
            label="工号"
            prop="workNumber"
            sortable
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
            sortable
            prop="timeOfEntry"
          >
            <template v-slot="{row}">
              {{ row.correctionTime }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push('/employees/detail/'+row.id)">查看</el-button>
              <el-button type="text" size="small" @click="hAssignRole(row.id)">分配角色</el-button>
              <el-button type="text" size="small" @click="hdel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            :current-page="pageParams.page"
            :page-sizes="[5 ,10, 15, 20]"
            :page-size="pageParams.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
    <el-dialog :visible.sync="showDialog" destroy-on-close title="新增员工">
      <emDialogs ref="emDialog" :obj="obj" @close="hClose" @submit="hSubmit" />
    </el-dialog>
    <el-dialog :visible.sync="showDialogRole" title="分配角色" @closed="closeDialog">
      <assignRole ref="assignRole" :user-id="userId" @close="showDialogRole=false" />
    </el-dialog>
  </div>
</template>
<script>
import { delEmployees, getEployees } from '@/api/employees'
import empployees from '@/constant/employees'
import emDialogs from './emDialog'
import assignRole from './assignRole'

// 枚举将数组对象转换为对象

// const obj = empployees.hireType.reduce((acc, item) => {
//   acc[item.id] = item.value
//   return acc
// }, {})
// console.log(obj)
export default {

  components: {
    emDialogs,
    assignRole
  },
  data() {
    return {
      showDialogRole: false,
      showDialog: false,
      pageParams: {
        page: 1,
        size: 10
      },
      total: 0,
      employees: [],
      obj: {},
      userId: ''
    }
  },
  async  created() {
    empployees.hireType.forEach(item => {
      this.obj[item.id] = item.value
    })
    await this.loadEmployees()
    // console.dir(location.hash)
    // 使用编程式导航传递参数让跳转到最后一页
    if (location.hash === '#/employees?name=lisi') {
      this.total + 1
      console.log(this.total)
      this.pageParams.page = Math.ceil(this.total / this.pageParams.size)
      this.loadEmployees()
      this.$router.push('/employees')
    }
  },

  methods: {
    // 获取数据渲染
    async loadEmployees() {
      const { data: res } = await getEployees(this.pageParams).catch(e => console.log(e))

      this.employees = res.rows
      this.total = res.total
    },
    // 枚举聘用形式
    formatEmployment(row) {
      return this.obj[row.formOfEmployment]
    },
    // 分页栏
    handleSizeChange(val) {
      this.pageParams.size = val
      this.loadEmployees()
    },
    // 分页栏
    handleCurrentChange(val) {
      this.pageParams.page = val
      this.loadEmployees()
    },
    // 删除操作
    async hdel(id) {
      const result = await this.$confirm('真的要删除吗', '提示', { type: 'warning' }).catch(e => e)
      if (result !== 'confirm') return
      await delEmployees(id).catch(e => e)
      if (this.employees.length === 1 && this.pageParams.page > 1) {
        this.pageParams.page--
      }
      this.loadEmployees()
    },
    // 新增员工
    addEmployees() {
      this.showDialog = true
    },
    // 关闭dialog
    hClose() {
      this.showDialog = false
    },
    hSubmit() {
      this.showDialog = false
      this.total + 1
      this.pageParams.page = Math.ceil(this.total / this.pageParams.size)
      // console.log(this.pageParams.page)

      this.loadEmployees()
    },
    async  DiaClosed() {
      await this.$nextTick()
      this.$refs.emDialog.close()
    },
    // 导出excel文件
    handleDownload() {
      import('@/vendor/Export2Excel').then(async excel => {
        // excel表示导入的模块对象
        const { data: res } = await getEployees({ size: this.total }).catch(e => console.log(e))
        console.log(res)

        const { data, header } = this.formatExcel(res.rows)
        console.log(excel)
        excel.export_json_to_excel({
          header, // 表头 必填
          data, // 具体数据 必填
          filename: '员工信息', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    },
    // 导出excel文件
    formatExcel(res) {
      const mapList = {
        'id': '编号',
        'password': '密码',
        'mobile': '手机号',
        'username': '姓名',
        'timeOfEntry': '入职日期',
        'formOfEmployment': '聘用形式',
        'correctionTime': '转正日期',
        'workNumber': '工号',
        'departmentName': '部门',
        'staffPhoto': '头像地址'
      }
      if (!res[0]) return
      let header = Object.keys(res[0])
      header = header.map(item => mapList[item])
      // console.log(header)
      const data = res.map(item => {
        // 将聘用形式修改成正式和非正式
        const k = item.formOfEmployment
        item.formOfEmployment = this.obj[k]
        console.log(k)
        return Object.values(item)
      })
      return { data, header }
    },
    // 分配权限
    async hAssignRole(id) {
      // console.log(id)
      this.userId = id
      this.showDialogRole = true
      await this.$nextTick()
      this.$refs.assignRole.loadGetAvatar()
    },
    closeDialog() {
      this.$refs.assignRole.roleIds = []
    }

  }

}
</script>
