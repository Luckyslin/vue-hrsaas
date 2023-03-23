<template>
  <div class="app-container" style="padding-top:30px">
    <el-card>
      <uploadExcel :on-success="handleSuccess" :before-upload="beforeUpload" />
    </el-card>
  </div>
</template>

<script>
import uploadExcel from '@/components/uploadExcel'
import { formatExcelDate } from '@/utils'
import { addimport } from '@/api/employees'

export default {
  name: 'UploadExcel',
  components: { uploadExcel },
  data() {
    return {

    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    async  handleSuccess({ results }) {
      // 转换excel数据并发送请求
      const res = this.updatExcel(results)
      const str = res.map(item => Object.keys(item))
      if (!str[0].includes('username')) return this.$message.error('文件格式错误')
      console.log(res.includes('username'))
      await addimport(res).catch(e => e)
      console.log(results)
      this.$router.push({
        path: '/employees',
        query: { name: 'lisi' }
      })
    },
    updatExcel(results) {
      // 更新格式转换函数
      const mapInfo = {
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '转正日期': 'correctionTime',
        '聘用形式': 'formOfEmployment'
      }
      // 将excel中文属性名转化成英文
      return results.map(item => {
        const obj = {}
        Object.keys(item).forEach(cn => {
          const cnkey = mapInfo[cn]
          // console.log(Object.keys(item).includes('姓名'))
          if (cnkey === 'correctionTime' || cnkey === 'timeOfEntry') {
            obj[cnkey] = formatExcelDate(item[cn])
          } else {
            obj[cnkey] = item[cn]
            // obj[mapInfo[cn]] = item[cn] 可以写成这样
          }
        })
        return obj
      })
    }
  }
}
</script>

