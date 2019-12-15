<template>
  <el-row class="article-detail">
    <div class="detail-header">
      <el-image
        :src="list.coverPicture"
        fit="cover"
      />
    </div>
    <el-col class="detail-content" :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">
      <div class="article-title" style="">{{ list.title }}</div>
      <div class="ck-content" v-html="content.content" />
      <div class="detail-bottom">
        <span class="blog-detail-time">
          {{ list.createTime }}
        </span>
        <span class="blog-detail-icon">
          <svg-icon icon-class="eye-open" />
          {{ list.hot===null ? 0 :list.hot }}
        </span>
        <span class="blog-detail-icon">
          <svg-icon icon-class="like" />
          0
        </span>
      </div>
      <el-col style="padding-top: 30px">
        <el-col style="text-align: right;padding: 30px">
          <el-input v-model="comment" type="textarea" rows="3" placeholder="输入评论内容" />
          <el-button size="small" type="primary" style="margin-top: 10px;" @click="addComment()">评论</el-button>
        </el-col>
      </el-col>
      <el-col :span="24" class="article-comment">
        <el-row :gutter="20" class="article-comment-item" style="margin: 0 !important;">
          <el-col :xs="{span: 5, offset: 0}" :sm="{span: 2, offset: 0}" :md="{span: 2, offset: 0}" :lg="{span: 2, offset: 0}" :xl="{span: 2, offset: 0}">
            <el-avatar :size="50" src="http://www.wanghuiwen.com/favicon.ico" />
          </el-col>
          <el-col class="article-comment-content" :xs="{span: 11, offset: 0}" :sm="{span: 16, offset: 0}" :md="{span: 16, offset: 0}" :lg="{span: 16, offset: 0}" :xl="{span: 16, offset: 0}">
            <el-row>热心网友</el-row>
            <el-row>评论了个啥</el-row>
          </el-col>
          <el-col :xs="{span: 8, offset: 0}" :sm="{span: 8, offset: 0}" :md="{span: 6, offset: 0}" :lg="{span: 6, offset: 0}" :xl="{span: 6, offset: 0}" class="article-comment-time">
            <el-row>
              <el-col :span="12">
                <a>回复</a>
              </el-col>
              <el-col :span="12">
                <svg-icon icon-class="like" />1
              </el-col>
            </el-row>
            <el-row>2099-99-99</el-row>
          </el-col>
        </el-row>
        <el-col :span="22" :offset="2">
          <el-row :gutter="20" class="article-comment-item" style="margin: 0 !important;">
            <el-col :xs="{span: 5, offset: 0}" :sm="{span: 3, offset: 0}" :md="{span: 2, offset: 0}" :lg="{span: 2, offset: 0}" :xl="{span: 2, offset: 0}">
              <el-avatar :size="50" src="http://www.wanghuiwen.com/favicon.ico" />
            </el-col>
            <el-col class="article-comment-content" :xs="{span: 11, offset: 0}" :sm="{span: 13, offset: 0}" :md="{span: 16, offset: 0}" :lg="{span: 16, offset: 0}" :xl="{span: 16, offset: 0}">
              <el-row>热心网友</el-row>
              <el-row>评论了个啥</el-row>
            </el-col>
            <el-col :xs="{span: 8, offset: 0}" :sm="{span: 8, offset: 0}" :md="{span: 6, offset: 0}" :lg="{span: 6, offset: 0}" :xl="{span: 6, offset: 0}" class="article-comment-time">
              <el-row>
                <el-col :span="12">
                  <a>回复</a>
                </el-col>
                <el-col :span="12">
                  <svg-icon icon-class="like" />1
                </el-col>
              </el-row>
              <el-row>2099-99-99</el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import ArticleApi from '@/api/article'
import '@/styles/content-styles.css'
import Prism from 'prismjs'

export default {
  name: 'Detail',
  data() {
    return {
      list: {},
      content: '',
      comment: ''
    }
  },
  mounted() {
    ArticleApi.detail(this.$route.query).then(response => {
      if (response.code === 200) {
        this.list = response.data.list
        this.content = response.data.content
      }
    })
  },
  updated: function() {
    Prism.highlightAll()
  },
  methods: {
    addComment() {
    }
  }
}
</script>

<style scoped>
  .article-title{
    font-size: 2rem;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .article-detail{
    background-color: #e3ebf7;
  }
 .detail-header{
   height: 50vh;
   position: relative;
 }
 .el-image {
   height: 100%;
   width: 100%;
 }

 .detail-content{
   position: relative;
   top: -40vh;
   padding: 10px;
   min-height: 70vh;
   background-color: white;
 }
 .detail-bottom{
   text-align: right;
   height: 20px;
   line-height: 20px;
   padding-left: 20px;
   padding-right: 20px;
 }
 .article-comment{
   border-bottom: solid 1px #9a9a9a;
   /*margin-left: 50px;*/
 }
  .article-comment-content{
    font-size: 14px;
  }
  .article-comment-item{
    height: 50px;
    line-height: 25px;
  }
  .blog-detail-icon{
    margin-right: 5px;
    margin-left: 5px;
  }
  .blog-detail-time{
    float: left;
  }
  .article-comment-time{
    font-size:12px;
  }
</style>
