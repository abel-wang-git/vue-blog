<template>
  <el-row class="article-detail">
    <el-col class="detail-header">
      <el-image
        :src="list.coverPicture"
        fit="cover"
      />
    </el-col>
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
    </el-col>
    <el-col class="article-detail-comment" :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">
      <el-col style="text-align: right;margin-bottom: 10px">
        <el-input v-model="comment" type="textarea" rows="3" placeholder="输入评论内容" />
        <el-button size="small" type="primary" style="margin-top: 10px;" @click="addComment()">评论</el-button>
      </el-col>
      <el-col class="comment-list">
        <el-col :span="22" :offset="1" class="article-comment">
          <div style="display: flex;">
            <el-avatar :size="35" />
            <div class="article-comment-user">
              <div>热心网友</div>
              <div>2019-12-12</div>
            </div>
          </div>
          <div class="comment-recomment">
            <div>回复</div>
            <div><svg-icon icon-class="like" /></div>
          </div>
        </el-col>
        <el-col :span="22" :offset="1" class="article-comment-item ">
          评论
          <el-col :span="24" class="article-comment-item-border">
            <div class="article-comment-item-child">
              <div style="display: flex;">
                <el-avatar :size="35" />
                <div class="article-comment-user">
                  <div>热心网友</div>
                  <div>2019-12-12</div>
                </div>
              </div>
              <div class="comment-recomment">
                <div>回复</div>
                <div><svg-icon icon-class="like" /></div>
              </div>
            </div>
            <div class="article-c-comment">
              评论
            </div>
            <div class="article-comment-item-child">
              <div style="display: flex;">
                <el-avatar :size="35" />
                <div class="article-comment-user">
                  <div>热心网友</div>
                  <div>2019-12-12</div>
                </div>
              </div>
              <div class="comment-recomment">
                <div>回复</div>
                <div><svg-icon icon-class="like" /></div>
              </div>
            </div>
            <div class="article-c-comment">
              评论
            </div>
          </el-col>
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
  }
  ,
  updated: function() {
    Prism.highlightAll()
  }
  ,
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
    padding-bottom: 10vh;
  }
 .detail-header{
   height: 50vh;
   position: absolute;
   top: 0;
 }
 .article-detail-comment{
   position: relative;
   background-color: white;
   margin-top: 20px;
   padding: 20px;
 }
 .el-image {
   height: 100%;
   width: 100%;
 }

 .detail-content{
   position: relative;
   /*top: -40vh;*/
   padding: 10px;
   margin-top: 10vh;
   min-height: 90vh;
   background-color: white;
   z-index: 100;
 }
 .detail-bottom{
   text-align: right;
   height: 20px;
   line-height: 20px;
   padding-left: 20px;
   padding-right: 20px;
 }
 .article-comment{
   justify-content: space-between;
   display: flex;
 }
  .blog-detail-icon{
    margin-right: 5px;
    margin-left: 5px;
  }
  .blog-detail-time{
    float: left;
  }
  .article-comment-item{
    padding-left: 50px;
    padding-top: 10px;
  }
  .article-comment-item-child{
    margin-top: 10px;
    padding-left: 10px;
    justify-content: space-between;
    display: flex;
  }
  .article-comment-item-border{
    border-left: solid 2px rgba(13, 18, 27, 0.95);
    margin-top: 10px;
  }
  .article-comment-user{
    display: flex;flex-direction:column;justify-content: space-around;padding-left: 10px;
    font-size: 14px;
  }
  .article-c-comment{
    padding-left: 60px;
    padding-top: 10px;
  }
  .comment-recomment{
    display: flex;flex-direction:column;justify-content: space-around;
    padding: 3px;
    font-size: 14px;
  }
  .comment-list{
    border-bottom: dashed 1px rgba(24,40,58,0.83);
    padding-bottom: 10px;
  }
</style>
