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
      <div class="article-title" style="">
        {{ list.title }}
        <div class="article-detail-author">
          <div style="display: flex;align-items: center">
            <el-avatar :size="20" :src="author.avatar" />
            <div style="padding-left: 10px">
              <div>{{ author.nickname }} &nbsp;</div>
            </div>
              <div>发布于{{ list.createTime!=null ?list.createTime.substring(0,10):'-' }}</div>
          </div>
          <router-link v-if="checkPermission(['admin'])" :to="{path:'/article/update',query:{id: list.articleId}}">
            <div class="article-detail-author-editor">
              编辑
            </div>
          </router-link>
        </div>
      </div>
      <div class="ck-content" v-html="content.content" />
      <div class="detail-bottom">
        <span class="blog-detail-icon" :style="{color: isLike ? '#ff3918' : '#8a8a8a' }" @click="like()">
          <svg-icon icon-class="like" class-name="detail-icon" />
        </span>
        <el-tooltip effect="light" placement="bottom">
          <div slot="content">
            <img src="@/assets/blog/1148331928.jpg" width="150px" height="150px">
          </div>
          <span class="blog-detail-icon" style="color:#ec8121;">
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
        <div class="article-detail-comment-bottom">
          <span v-if="commentError" class="article-detail-comment-error">评论内容不能为空</span>
          <span v-else />
          <el-button size="small" type="primary" style="margin-top: 10px;" @click="addComment(0)">评论</el-button>
        </div>
      </el-col>
      <el-col v-for="(item, index) in commentList" :key="index" class="comment-list">
        <el-col :span="22" :offset="1" class="article-comment">
          <div style="display: flex;">
            <el-avatar :size="35" :src="item.avatar" />
            <div class="article-comment-user">
              <div>{{ item.name }}</div>
              <div>{{ item.createTime.substring(0,10) }}</div>
            </div>
          </div>
          <div class="comment-recomment">
            <div @click="openComment(item.commentId)">回复</div>
          </div>
        </el-col>
        <el-col :span="22" :offset="1" class="article-comment-item ">
          {{ item.comment }}
          <el-col v-if="replyCommentId === item.commentId" class="article-c-comment-reply">
            <el-input v-model="reply" type="textarea" rows="2" :placeholder=" '回复:' + item.name" />
            <div class="article-detail-comment-bottom">
              <span v-if="replyError" class="article-detail-comment-error">评论内容不能为空</span>
              <span v-else />
              <el-button size="small" type="primary" style="margin-top: 10px;" @click="addComment(item.commentId)">回复</el-button>
            </div>
          </el-col>
          <el-col v-if="item.reply" :span="24" class="article-comment-item-border">
            <div v-for="(replyitem, i) in item.reply" :key="i" class="article-c-comment-item">
              <div class="article-comment-item-child">
                <div style="display: flex;">
                  <el-avatar :size="35" :src="replyitem.avatar" />
                  <div class="article-comment-user">
                    <div>{{ replyitem.name +' 回复 '+ replyitem.replyName }}</div>
                    <div>{{ replyitem.createTime.substring(0,10) }}</div>
                  </div>
                </div>
                <div class="comment-recomment">
                  <div @click="openComment(replyitem.commentId)">回复</div>
                </div>
              </div>
              <div class="article-c-comment">
                {{ replyitem.comment }}
                <el-col v-if="replyCommentId === replyitem.commentId" class="article-c-comment-reply">
                  <el-input v-model="reply" type="textarea" rows="2" :placeholder=" '回复:' + replyitem.name" />
                  <el-button size="small" type="primary" style="margin-top: 10px;" @click="addComment(replyitem.commentId)">回复</el-button>
                </el-col>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-col>
    </el-col>
    <el-col
      :xs="{span: 24, offset: 0}"
      :sm="{span: 24, offset: 0}"
      :md="{span: 16, offset: 4}"
      :lg="{span: 16, offset: 4}"
      :xl="{span: 12, offset: 6}"
    >
      <el-dialog title="请先登录" :visible.sync="loginVisible" :width="dialogWidth">
        <login :visible="loginVisible" @setVisible="setVisible" />
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import ArticleApi from '@/api/article'
import '@/styles/content-styles.css'
import { mapGetters } from 'vuex'
import 'element-ui/lib/theme-chalk/display.css'
import checkPermission from '@/utils/permission'

import Prism from 'prismjs'
import { Message } from 'element-ui'
import Login from './login'

export default {
  name: 'Detail',
  components: { Login },
  data() {
    return {
      list: {},
      author: {},
      isLike: false,
      commentList: {},
      content: '',
      comment: '',
      reply: '',
      replyCommentId: '',
      commentError: false,
      replyError: false,
      loginVisible: false,
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
    ArticleApi.detail({ id: this.$route.params.id }).then(response => {
      if (response.code === 200) {
        this.list = response.data.list
        this.isLike = response.data.isLike
        this.author = response.data.author
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
    checkPermission,
    addComment(pid) {
      const comment = {}
      comment.articleId = this.list.articleId
      if (this.comment) {
        comment.comment = this.comment
      } else {
        comment.comment = this.reply
      }
      if (!comment.comment) {
        if (pid === 0) {
          this.commentError = true
        } else {
          this.replyError = true
        }
        return
      }
      comment.pId = pid
      ArticleApi.addComment(comment).then(response => {
        if (response.code === 200) {
          this.comment = null
          this.reply = null
          this.listComment()
          Message({
            message: '评论成功',
            type: 'success',
            duration: 2 * 1000
          })
          this.replyCommentId = null
        }
        if (response.code === 200403) {
          this.loginVisible = true
        }
      })
    },
    openComment(pid) {
      this.commentError = false
      this.replyError = false
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
          this.isLike = true
        }
        if (response.code === 200403) {
          this.loginVisible = true
        }
      })
    },
    setDialogWidth() {
      var val = document.body.clientWidth
      const def = 800 // 默认宽度
      if (val < def) {
        this.dialogWidth = '100%'
      } else {
        this.dialogWidth = def + 'px'
      }
    },
    setVisible(val) {
      this.loginVisible = val
    }
  }
}
</script>

<style scoped>
  .article-title {
    font-size: 2rem;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 5px;
    border-bottom:  4px solid transparent;
    border-image: radial-gradient(circle, #141416, rgba(255, 255, 255, 0)) 100 20;
    color: rgba(27, 27, 27, 0.84);
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

  @media screen and (min-width: 700px) {
    .detail-content {
      position: relative;
      padding: 10px 40px 60px 40px;
      margin-top: 10vh;
      min-height: 90vh;
      background-color: white;
      z-index: 100;
    }
  }
  @media screen and (max-width: 700px) {
    .detail-content {
      position: relative;
      padding: 10px 10px 60px 10px;
      min-height: 100vh;
      background-color: white;
      z-index: 100;
    }
  }

  .detail-bottom {
    text-align: center;
    height: 40px;
    position: absolute;
    line-height: 40px;
    bottom: 20px;
    width: calc(100% - 80px);
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
    padding-top: 10px;
    margin-left: 10px;
    justify-content: space-between;
    display: flex;
    border-top: dotted 1px rgba(162,162,162,0.83);
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
  .article-c-comment-reply{
    text-align: right;
    margin-top: 15px;
  }
  .article-c-comment-item {
    padding-top: 5px;
  }
  .detail-icon{
    font-size: 30px;
  }
  .el-dialog__body{
    padding: 10px 20px !important;
  }

  .article-c-comment-reply{
    text-align: right;
    margin-top: 15px;
  }
  .article-c-comment-item{
    padding-top: 5px;
  }
  .article-detail-comment-error{
    color: red;
    font-size: 0.5rem;
  }
  .article-detail-comment-bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .article-detail-author{
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: rgba(27, 27, 27, 0.84);
  }

  .article-detail-author-editor{
    color: #202fff;
  }
</style>
