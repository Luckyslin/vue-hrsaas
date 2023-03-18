<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <!-- 封装成组件 -->
        <dataTloo :node-tree="companyInfo" :company="false" @addDepts="addDepts" />
        <!-- 下面的数状结构 -->
        <el-tree
          ref="tree"
          :data="list"

          default-expand-all
          node-key="id"
          highlight-current
        >
          <template v-slot="{ data}">
            <!-- 样式与前面标题一样封装成组件 -->
            <dataTloo :node-tree="data" :company="true" @addDepts="addDepts" @editDepts="editDepts" @deltDepts="deltDepts" />

          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- dialog组件 -->
    <addDepts ref="addDepts" :node-tree="nodeTree" @addBranch="getDepts" />
  </div>
</template>

<script>
import { getDepartment } from '@/api/departments'
import { delBranch } from '@/api/departments'
import { mapMutations } from 'vuex'
import dataTloo from './components/dataTloo'
import addDepts from './components/addDepts'
export default {
  name: 'VueAdminTemplateMasterIndex',
  components: {
    dataTloo,
    addDepts
  },
  data() {
    return {
      companyInfo: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人',
        id: ''
      },
      list: [],

      nodeTree: {}
    }
  },

  created() {
    this.getDepts()
  },

  methods: {
    ...mapMutations('user', ['openDialog']),
    async  getDepts() {
      const { data: res } = await getDepartment()

      this.list = this.listTrees(res.depts, '')
      // console.log(this.list)
    },
    listTrees(list, id) {
      const res = []
      list.forEach(item => {
        if (item.pid === id) {
          item.children = this.listTrees(list, item.id)
          res.push(item)
        }
      })
      return res
    },
    // 弹出新增列表
    addDepts(nodeTree) {
      this.openDialog()
      this.$refs.addDepts.title = '新增数据'
      this.nodeTree = nodeTree
    },
    // 编辑弹出数据回显
    editDepts(nodeTree) {
      this.openDialog()
      this.$refs.addDepts.title = '编辑数据'
      this.nodeTree = nodeTree
      // console.log(nodeTree)
      this.$refs.addDepts.geteditSimple(nodeTree.id)
    },
    // 根据id删除部门
    deltDepts(nodeTree) {
      // this.nodeTree = nodeTree
      this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delBranch(nodeTree.id)
        this.getDepts()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
