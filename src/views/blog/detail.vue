<template>
  <div class="app-container">
      <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">
        <h1>{{ list.title }}</h1>
        <h5>{{ list.createTime }}</h5>
        <div v-html="content.content" />
      </el-col>
  </div>
</template>

<script>
import ArticleApi from '@/api/article'
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

</style>
