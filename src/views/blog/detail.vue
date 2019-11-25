<template>
  <div>
    <div v-html="content.content"></div>
  </div>
</template>

<script>
import ArticleApi from '@/api/article'

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
  }
}
</script>

<style scoped>

</style>
