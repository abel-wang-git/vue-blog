<template>
  <el-row class="article-detail">
    <el-col class="detail-header">
      <el-image
        :src="list.coverPicture"
        fit="cover"
      />
    </el-col>
    <el-col
      class="detail-content"
      :xs="{span: 24, offset: 0}"
      :sm="{span: 24, offset: 0}"
      :md="{span: 16, offset: 4}"
      :lg="{span: 16, offset: 4}"
      :xl="{span: 12, offset: 6}"
    >
      <div class="article-title" style="">{{ list.title }}</div>
      <div class="ck-content" v-html="content.content" />
      <div class="detail-bottom">
        <span class="blog-detail-icon" @click="like()">
          <svg-icon icon-class="like" class-name="detail-icon" />
        </span>
        <el-tooltip effect="light" placement="bottom">
          <div slot="content">
            <img src="@/assets/blog/1148331928.jpg" width="150px" height="150px">
          </div>
          <span class="blog-detail-icon">
            <svg-icon icon-class="donation" class-name="detail-icon" />
          </span>
        </el-tooltip>
      </div>
    </el-col>
    <el-col
      class="article-detail-comment"
      :xs="{span: 24, offset: 0}"
      :sm="{span: 24, offset: 0}"
      :md="{span: 16, offset: 4}"
      :lg="{span: 16, offset: 4}"
      :xl="{span: 12, offset: 6}"
    >
      <el-col style="text-align: right;margin-bottom: 10px">
        <el-input v-model="comment" type="textarea" rows="3" placeholder="输入评论内容" />
        <el-button size="small" type="primary" style="margin-top: 10px;" @click="addComment(0)">评论</el-button>
      </el-col>
      <el-col v-for="(item, index) in commentList" :key="index" class="comment-list">
        <el-col :span="22" :offset="1" class="article-comment">
          <div style="display: flex;">
            <el-avatar :size="35" />
            <div class="article-comment-user">
              <div>{{ item.name }}</div>
              <div>{{ item.createTime }}</div>
            </div>
          </div>
          <div class="comment-recomment">
            <div @click="openComment(item.commentId)">回复</div>
            <div>
              <svg-icon icon-class="like" />
            </div>
          </div>
        </el-col>
        <el-col :span="22" :offset="1" class="article-comment-item ">
          {{ item.comment }}
          <el-input v-if="replyCommentId === item.commentId" v-model="comment" type="textarea" rows="3" placeholder="输入评论内容" />
          <el-col v-if="item.reply" :span="24" class="article-comment-item-border">
            <div v-for="(item) in item.reply" :key="item.commentId">
              <div class="article-comment-item-child">
                <div style="display: flex;">
                  <el-avatar :size="35" />
                  <div class="article-comment-user">
                    <div>{{ item.name }}</div>
                    <div>{{ item.createTime }}</div>
                  </div>
                </div>
                <div class="comment-recomment">
                  <div>回复</div>
                  <div>
                    <svg-icon icon-class="like" />
                  </div>
                </div>
              </div>
              <div class="article-c-comment">
                {{ item.comment }}
              </div>
            </div>
          </el-col>
        </el-col>
      </el-col>
    </el-col>
    <el-col
      class="article-detail-comment"
      :xs="{span: 24, offset: 0}"
      :sm="{span: 24, offset: 0}"
      :md="{span: 16, offset: 4}"
      :lg="{span: 16, offset: 4}"
      :xl="{span: 12, offset: 6}"
    >
      <el-dialog title="请先登录" :visible.sync="loginVisible" :width="dialogWidth">
        <el-form v-if="loginType===1" ref="loginForm" :model="loginForm" auto-complete="on">
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              prefix-icon="el-icon-s-custom"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              prefix-icon="el-icon-key"
            />
          </el-form-item>
          <a @click="loginType=2">注册</a>
          <div style="text-align: center">
            <el-button size="mini" type="primary" @click="loginUser()">登录</el-button>
            <el-button size="mini" @click="loginVisible=false">取消</el-button>
          </div>
        </el-form>
        <el-form v-if="loginType===2" ref="loginForm" :model="loginForm" auto-complete="on">
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="登录邮箱"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              prefix-icon="el-icon-s-custom"
            />
          </el-form-item>

          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.nickname"
              placeholder="昵称"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              prefix-icon="el-icon-s-custom"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              prefix-icon="el-icon-key"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginForm.repassword"
              type="password"
              placeholder="重复密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              prefix-icon="el-icon-key"
            />
          </el-form-item>
          <a @click="loginType=1">登录</a>
          <div style="text-align: center">
            <el-button size="mini" type="primary" @click="registered()">注册</el-button>
            <el-button size="mini" @click="loginVisible=false">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import ArticleApi from '@/api/article'
import '@/styles/content-styles.css'
import { mapGetters } from 'vuex'

import Prism from 'prismjs'
import { Message } from 'element-ui'

export default {
  name: 'Detail',
  data() {
    return {
      list: {},
      commentList: {},
      content: '',
      comment: '',
      replyCommentId: '',
      loginVisible: false,
      loginForm: {
        username: '',
        password: '',
        nickname: '',
        repassword: ''
      },
      loginType: 1,
      dialogWidth: '0'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    ArticleApi.detail(this.$route.query).then(response => {
      if (response.code === 200) {
        this.list = response.data.list
        this.content = response.data.content
        this.listComment()
      }
    })
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
    if (document.body.clientWidth < 768) {
      this.dialogWidth = '100%'
    } else {
      this.dialogWidth = '400px'
    }
  },
  updated: function() {
    Prism.highlightAll()
  },
  methods: {
    loginUser() {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.loginVisible = false
      })
    },
    registered() {
      this.$store.dispatch('user/registered', this.loginForm).then(() => {
        this.loginVisible = false
      })
    },
    addComment(pid) {
      const comment = {}
      comment.articleId = this.list.articleId
      comment.comment = this.comment
      comment.pId = pid
      ArticleApi.addComment(comment).then(response => {
        if (response.code === 200) {
          this.comment = null
          this.listComment()
          Message({
            message: '评论成功',
            type: 'success',
            duration: 2 * 1000
          })
        }
      })
    },
    openComment(pid) {
      this.replyCommentId = pid
    },
    listComment() {
      ArticleApi.listComment({ articleId: this.list.articleId }).then(response => {
        this.commentList = response.data
      })
    },
    like() {
      ArticleApi.like({ articleId: this.list.articleId, uid: 123 }).then(response => {
        if (response.code === 200) {
          Message({
            message: response.message,
            type: 'success',
            duration: 2 * 1000
          })
        }
        if (response.code === 200403) {
          this.loginVisible = true
        }
      })
    },
    setDialogWidth() {
      console.log(document.body.clientWidth)
      var val = document.body.clientWidth
      const def = 800 // 默认宽度
      if (val < def) {
        this.dialogWidth = '100%'
      } else {
        this.dialogWidth = def + 'px'
      }
    }
  }
}
</script>

<style scoped>
  .article-title {
    font-size: 2rem;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .article-detail {
    background-color: #e3ebf7;
    padding-bottom: 10vh;
  }

  .detail-header {
    height: 50vh;
    position: absolute;
    top: 0;
  }

  .article-detail-comment {
    position: relative;
    background-color: white;
    margin-top: 20px;
    padding: 20px;
  }

  .el-image {
    height: 100%;
    width: 100%;
  }

  .detail-content {
    position: relative;
    /*top: -40vh;*/
    padding: 10px;
    margin-top: 10vh;
    min-height: 90vh;
    background-color: white;
    z-index: 100;
  }

  .detail-bottom {
    text-align: center;
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 20px;
    width: 100%;
  }

  .article-comment {
    justify-content: space-between;
    display: flex;
  }

  .blog-detail-icon {
    margin-right: 5px;
    margin-left: 5px;
  }

  .blog-detail-time {
    float: left;
  }

  .article-comment-item {
    padding-left: 50px;
    padding-top: 10px;
  }

  .article-comment-item-child {
    margin-top: 10px;
    padding-left: 10px;
    justify-content: space-between;
    display: flex;
  }

  .article-comment-item-border {
    border-left: solid 3px rgba(119, 119, 119, 0.56);
    margin-top: 10px;
  }

  .article-comment-user {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    font-size: 14px;
  }

  .article-c-comment {
    padding-left: 60px;
    padding-top: 10px;
  }

  .comment-recomment {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 3px;
    font-size: 14px;
  }

  .comment-list {
    border-bottom: dashed 1px rgba(24, 40, 58, 0.83);
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
  .detail-icon{
    font-size: 30px;
  }
  .el-dialog__body{
    padding: 10px 20px !important;
  }
</style>
