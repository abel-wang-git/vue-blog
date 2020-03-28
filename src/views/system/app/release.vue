<template>
  <div class="app-container">
    <el-form ref="app" :model="appHistory" label-width="120px">
      <el-row>
        <el-col :span="11">
          <el-form-item>
            {{ appName }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="app安装包">
            <el-upload
              class="avatar-uploader"
              :action="apkUploadUrl"
              :headers="token"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <el-input v-model="appHistory.url" placeholder="上传apk"/>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="二维码">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="token"
              :show-file-list="false"
              :on-success="qrcodeSuccess"
              :before-upload="beforeqrcodeUpload">
              <img v-if="appHistory.qrcode" :src="appHistory.qrcode" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!--<el-input v-model="app.qrcode"/>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="平台">
            <el-select v-model="appHistory.platform" placeholder="平台">
              <el-option label="Android" value="Android"></el-option>
              <el-option label="IOS" value="IOS"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="版本">
            <el-input v-model="appHistory.version" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="更新信息">
            <el-input v-model="appHistory.info" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <router-link to="/sys/app"><el-button type="primary">返回</el-button></router-link>
      </el-form-item>
      <el-input v-model="appHistory.appId" type="hidden"/>
    </el-form>
  </div>
</template>

<script>
import AppApi from '@/api/app'
import { Message } from 'element-ui'

export default {
  name: 'Release',
  data() {
    return {
      appHistory: {
        url: '',
        qrcode: ''
      },
      appName: '',
      token: null
    }
  },
  created() {
    this.appHistory.appId = this.$route.query.appId
    this.appName = this.$route.query.appName
    this.token = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('vue_admin_template_token')
    }
  },
  methods: {
    onSubmit() {
      AppApi.addRelease(this.appHistory).then(response => {
        if (response.code === 200) {
          Message({
            message: response.message || 'success',
            type: 'success',
            duration: 2 * 1000
          })
          this.$router.back()
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.appHistory.url = res.data.url
      this.appHistory.md5 = res.data.md5
    },

    beforeAvatarUpload(file) {
    },
    qrcodeSuccess(res, file) {
      this.appHistory.qrcode = process.env.VUE_APP_IMAGE_HOST + res.data
    },
    beforeqrcodeUpload(file) {
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
