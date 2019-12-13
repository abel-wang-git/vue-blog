<template>
  <div class="app-container">
    <el-form ref="article" :model="article" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="分类" prop="classId">
            <el-select v-model="article.classId" placeholder="文章分类">
              <el-option v-for="(item, index) in classOption" :key="index" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="封面" prop="">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="token"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="article.coverPicture" :src="article.coverPicture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="20">
          <el-form-item label="内容" prop="content">
            <editor v-model="article.content" :content="article.content" @getContent="getContent" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import ArticleApi from '@/api/article'
import { Message } from 'element-ui'

export default {
  components: { Editor },
  data() {
    return {
      article: {
        title: '',
        content: '',
        classId: '',
        id: '',
        coverPicture: ''
      },
      token: null,
      rules: {
        title: [{ required: true, message: '请添加标题', trigger: 'blur' }],
        classId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        coverPicture: [{ required: true, message: '封面不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      classOption: [
        {
          value: 1,
          label: '文章'
        },
        {
          value: 2,
          label: '笔记'
        }
      ]
    }
  },

  mounted() {
    this.token = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('vue_admin_template_token')
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.article.coverPicture = process.env.VUE_APP_IMAGE_HOST + res.data
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },

    getContent: function(data) {
      this.article.content = data
    },

    onSubmit: function() {
      this.$refs.article.validate(valid => {
        if (valid) {
          if (!this.article.id) {
            ArticleApi.save(this.article).then(response => {
              Message({
                message: response.message || 'success',
                type: 'success',
                duration: 2 * 1000
              })
              if (response.code === 200) {
                this.article.id = response.data
                this.$router.go(-1)
              }
            })
          } else {
            ArticleApi.update(this.article).then(response => {
              Message({
                message: response.message || 'success',
                type: 'success',
                duration: 2 * 1000
              })
              if (response.code === 200) {
                this.article.id = response.data
                this.$router.go(-1)
              }
            })
          }
        }
      })
    }
  }

}

</script>

<style scoped>
  .line{
    text-align: center;
  }

</style>
<style>
  .ck-content {
    min-height: 300px;
  }

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

