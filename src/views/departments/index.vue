<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="19">
            <svg-icon icon-class="home" /><span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="5">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree
          ref="tree"
          :data="list"

          default-expand-all
          node-key="id"
          highlight-current
        >
          <template v-slot="{data}">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width:100%">
              <el-col :span="19">
                <svg-icon icon-class="home" /><span>{{ data.name }}</span>
              </el-col>
              <el-col :span="5">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager }}</el-col>
                  <!-- 下拉菜单 element -->
                  <el-col>
                    <el-dropdown>
                      <span>
                        操作<i class="el-icon-arrow-down" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/user'
export default {
  name: 'VueAdminTemplateMasterIndex',

  data() {
    return {
      list: []
    }
  },

  async created() {
    const { data: res } = await getDepartment()
    this.list = res.depts
    console.log(res)
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
