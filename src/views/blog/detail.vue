<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <h1>{{list.title}}</h1>
      <h1>{{list}}</h1>
      <div v-html="content.content"></div>
    </el-col>
  </el-row>
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
  created() {
    ArticleApi.detail(this.$route.query).then(response => {
      if (response.code === 200) {
        this.list = response.data.list
        this.content = response.data.content
      }
    })
  },
  mounted() {
  },
  updated: function() {
    Prism.highlightAll()
  }
}
</script>

<style scoped>

</style>
