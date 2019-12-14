<template>
  <div style="width: 100vw">
    <div class="detail-header">
      <el-image
        :src="list.coverPicture"
        fit="cover"
      />
      <div class="detail-title">
        <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">

          <div style="font-size: 2rem">{{ list.title }}</div>
          <h5>{{ list.createTime }}</h5>
          <div class="detail-bottom">
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
      </div>
    </div>
    <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">
      <div class="detail-content">
        <div class="ck-content" v-html="content.content" />
      </div>
    </el-col>
  </div>
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
      content: ''
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
  }
}
</script>

<style scoped>
 .detail-header{
   height: 30vh;
   position: relative;
 }
 .el-image {
   height: 100%;
   width: 100%;
 }
 .detail-title{
    position: absolute;
    bottom: 0;
    background-color: white;
    opacity: 0.8;
    width: 100%;
    padding-left: 30px;
    padding-top: 20px;
  }

 .detail-content{
   padding: 10px;
 }
 .detail-bottom{
   text-align: right;
   height: 20px;
   line-height: 20px;
 }
  .blog-detail-icon{
    margin-right: 5px;
    margin-left: 5px;
  }
</style>
