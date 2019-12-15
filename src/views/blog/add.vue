<template>
  <div class="app-container">
    <el-form ref="article" :model="article" :rules="rules" label-width="120px">
      <div class="article-add-content">
        <el-row>
          <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">
            <input v-model="article.title" class="title-input" placeholder="标题">
            <editor v-model="article.content" :content="article.content" @getContent="getContent" />
            <el-row class="article-add-setting">
              <el-upload
                class="avatar-uploader setting-item"
                :action="uploadUrl"
                :headers="token"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="article.coverPicture" :src="article.coverPicture" class="avatar">
                <div v-else class="avatar-uploader-icon">
                  <div class="avatar-uploader-text">
                    <i class="el-icon-plus" />选择封面
                  </div>
                </div>
              </el-upload>
              <el-select
                v-model="article.classId"
                filterable
                allow-create
                placeholder="文章分类"
                class="setting-item"
              >
                <el-option v-for="(item, index) in classOption" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-row>
          </el-col>

        </el-row>
      </div>

      <el-row class="article-add-bottom">
        <el-col class="article-add" :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button type="primary">预览</el-button>
          <el-button>取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import ArticleApi from '@/api/article'
import { Message } from 'element-ui'
import '@/styles/ck-styles.css'

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
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
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
    },
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(document.querySelector('.ck-sticky-panel__content'))
      var offsetTop = document.querySelector('.ck-sticky-panel').offsetTop
      console.log(offsetTop)
      // if (scrollTop > 100) {
      //   // offsetTop = 300 - Number(scrollTop)
      //   document.querySelector('.ck-sticky-panel__content').style.position = 'fixed!important'
      //   document.querySelector('.ck-sticky-panel__content').style.top = '0'
      // } else {
      //   document.querySelector('.ck-sticky-panel__content').style.top = offsetTop + 'px'
      // }
    }
  }

}

</script>

<style>
  .avatar-uploader .el-upload {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    float: left;
  }
  .setting-item{
    margin: 10px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #5d9d45;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 178px;
    display: block;
  }
  .title-input{
    /*caret-color: black;*/
    border:none;
    line-height: 50px;
    outline:medium;
    height: 50px;
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 2rem;
    width:100%;
    text-align: center;
  }
  .title-input:-ms-input-placeholder{
    font-size:2rem;
  }
  .title-input::-webkit-input-placeholder{
    font-size:2rem;
  }
  .title-input{
    animation: animations 1s infinite;
  }

  @keyframes animations {
    0%{
      border-bottom: solid 1px #ccc;
    }
    50%{
      border-bottom: solid 1px black;
    }
    100%{
      border-bottom: solid 1px #ccc;
    }
  }
  .article-add-bottom{
    position: fixed;
    bottom: 0;
    left:0;
    padding: 10px;
    background-color: #777777;
    width: 100vw;
    height: 50px;
    text-align: right;
  }
  .article-add-content{
    margin-bottom: 60px;
  }
  .article-add-setting{
    border: solid #777777 1px;
    margin-top: 20px;
    padding: 20px;
  }
  .avatar-uploader-text{
    position: absolute;
    height: 170px;
    width: 178px;
    line-height: 178px;
    font-size: 15px;
    color: #8c939d;
  }
  .ck-sticky-panel__content{
    /*position: fixed!important;*/
    /*top: 0 !important;;*/
  }
</style>

