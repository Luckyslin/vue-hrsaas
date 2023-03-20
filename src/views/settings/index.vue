<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog=true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table
              border=""
              :data="roles"
            >
              <el-table-column label="序号" width="120" type="index" prop="id" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column
                label="描述"
                prop="description"
              />
              <el-table-column label="操作">
                <template v-slot="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger" @click="hDel(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <!-- current-page当前页 -->
              <!-- page-sizes 设置每页显示多少条 -->
              <!-- page-size 当前页显示多少条 -->
              <!-- total 总条数 -->
              <!-- size-change 当前页改变触发 -->
              <!-- current-change 设置每页显示多少条触发-->
              <el-pagination
                :current-page="q.page"
                :page-sizes="[2, 3, 5, 10]"
                :page-size="q.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </el-card>
      <el-dialog title="编辑弹层" :visible="showDialog" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">

          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>

        </el-row>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addRole, delRole, getRole } from '@/api/role'
export default {
  data() {
    return {
      q: {
        page: 1,
        pagesize: 2
      },
      roles: [],
      total: 0,
      showDialog: false,
      // 专门接收新增或者编辑的编辑的表单数据
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadRole()
  },
  methods: {
    async loadRole() {
      try {
        const { data: res } = await getRole(this.q)
        console.log(res)
        this.total = res.total
        this.roles = res.rows
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange(val) {
      this.q.pagesize = val
      this.loadRole()
    },
    handleCurrentChange(val) {
      this.q.page = val
      this.loadRole()
    },
    async hDel(row) {
      // 使用try catch
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
    //   .then(async() => {
    //     try {
    //       await delRole(row.id)
    //       this.loadRole()
    //     } catch (error) {
    //       return
    //     }
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
      const reslut = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning'
      }).catch(e => e)
      console.log(reslut)
      if (reslut !== 'confirm') return
      await delRole(row.id).catch(e => e)
      if (this.roles.length === 1 && this.q.page > 1) {
        this.q.page--
      }
      this.loadRole()
    },
    // 取消按钮
    btnCancel() {
      this.showDialog = false
      this.$refs.roleForm.resetFields()
    },
    btnOK() {
      this.$refs.roleForm.validate(async valid => {
        if (!valid) return
        console.log({ ...this.roleForm })
        await addRole({ ...this.roleForm }).catch(e => e)
      })
      this.showDialog = false
      this.$refs.roleForm.resetFields()
    }

  }

}
</script>
