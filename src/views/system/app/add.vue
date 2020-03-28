<template>
  <div class="app-container">
    <el-form ref="app" :model="app"  label-width="120px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="app名称">
            <el-input v-model="app.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <router-link to="/sys/app"><el-button type="primary">返回</el-button></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AppApi from '@/api/app'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      app: {
      },
      token: null
    }
  },
  mounted() {
    this.token = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('vue_admin_template_token')
    }
  },
  methods: {
    onSubmit: function() {
      AppApi.add(this.app).then(response => {
        Message({
          message: response.message || 'success',
          type: 'success',
          duration: 2 * 1000
        })
        this.$router.back()
      })
    },
  }

}

</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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

