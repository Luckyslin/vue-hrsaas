<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <img v-if="value" :src="value" class="avatar">
      <i v-else v-show="!showProgress" class="el-icon-plus avatar-uploader-icon" />
      <el-progress v-if="showProgress" type="circle" :percentage="percent" :width="178" />
    </el-upload>
  </div>
</template>
<script>
// 下面的代码是固定写法
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: 'AKIDDGBxXryrTJrBG9oFSPCtRL3ZtyqZ8Wih', // 身份识别ID
  SecretKey: 'q5C81rWdqAOXR8aliQr285nHZeV8VdXB' // 身份秘钥
})

export default {
  name: 'UploadImage',
  props: {
    value: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      // imageUrl: '',
      showProgress: false,
      percent: 0
    }
  },
  methods: {
    upload(res) {
      if (res.file) {
        // this.imageUrl = ''
        this.$emit('input', '')
        this.showProgress = true
        // 执行上传操作
        cos.putObject({
          Bucket: 'web-1317438728', /* 存储桶 */
          Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
          Key: res.file.name, /* 文件名 */
          StorageClass: 'STANDARD', // 上传模式, 标准模式
          Body: res.file, // 上传文件对象
          // 省略其他...
          onProgress: (progressData) => {
            this.percent = parseInt(progressData.percent * 10)

            console.log(JSON.stringify(progressData))
          }

        }, (err, data) => {
          console.log(err || data)
          // 上传成功之后
          if (data.statusCode === 200) {
            // this.imageUrl = `https://${data.Location}`
            this.$emit('input', `https://${data.Location}`)
            this.showProgress = false
          }
        })
      }
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit('input', URL.createObjectURL(file.raw))
    },
    beforeAvatarUpload(file) {
      // const isPNG = file.type === 'image/png'
      const isLt4M = file.size / 1024 / 1024 < 4
      // if (!isPNG) {
      //   this.$message.error('上传头像图片只能是 PNG 格式!')
      // }
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return isLt4M
    }

  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
