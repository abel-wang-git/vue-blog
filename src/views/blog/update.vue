<template>
  <div class="app-container">
    <el-form ref="article" :model="article" label-width="120px">
      <div class="article-add-content">
        <el-row>
          <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">
            <input v-model="article.title" class="title-input" placeholder="标题">
            <editor v-model="article.content" :content="article.content" @getContent="getContent" />
            <el-row :gutter="20" class="article-add-setting">
              <el-col :span="5">
                <el-upload
                  class="avatar-uploader"
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
              </el-col>
              <el-col class="article-types" style="display: inline-block" :span="16">
                <el-form-item label="文章分类">
                  <el-radio-group v-model="article.classId">
                    <el-radio v-for="(item, index) in classOption" :key="index" :label="item.classId">{{ item.className }}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否公开">
                  <el-radio-group v-model="article.status">
                    <el-radio :label="1">公开</el-radio>
                    <el-radio :label="2">不公开</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否置顶">
                  <el-radio-group v-model="article.top">
                    <el-radio :label="true">置顶</el-radio>
                    <el-radio :label="false">不置顶</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button size="mini" type="success" @click="openAddDialog">添加分类</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-row class="article-add-bottom">
        <el-col class="article-add" :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <router-link :to="{path:'/'}"><el-button>取消</el-button></router-link>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%">
      <el-row>
        <el-input v-model="articleClass" />
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addArticleClass">确 定</el-button>
      </span>
    </el-dialog>
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
        content: ''
      },
      addtip: {
        articleId: 'id',
        title: '标题',
        content: '内容',
        classId: '文章分类',
        coverPicture: '封面图片',
        top: '置顶',
        status: '是否公开'
      },
      token: null,
      articleClass: null,
      classOption: [],
      dialogVisible: false,
      dialogPreview: false
    }
  },

  mounted() {
    this.token = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('vue_admin_template_token')
    }
    this.getClassList()
  },
  created() {
    ArticleApi.detail(this.$route.query).then(response => {
      if (response.code === 200) {
        this.article = response.data.list
        this.article.content = response.data.content.content
      }
    })
  },
  methods: {
    addArticleClass() {
      ArticleApi.addClass({ className: this.articleClass }).then(response => {
        if (response.code === 200) {
          this.getClassList()
          this.articleClass = null
          this.dialogVisible = false
        }
      })
    },
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
      for (const a in this.article) {
        if (this.article[a] === '') {
          this.$msgbox({
            message: this.addtip[a] + '不能为空',
            showConfirmButton: false,
            center: true
          })
          return
        }
      }
      ArticleApi.update(this.article).then(response => {
        if (response.code === 200) {
          Message({
            message: response.message || 'success',
            type: 'success',
            duration: 2 * 1000
          })
        }
      })
    },

    getClassList() {
      ArticleApi.classList().then(response => {
        if (response.code === 200) {
          this.classOption = response.data
        }
      })
    },

    openAddDialog() {
      this.articleClass = null
      this.dialogVisible = true
    }
  }

}

</script>

<style scoped>
  .avatar-uploader .el-upload {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    float: left;
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

