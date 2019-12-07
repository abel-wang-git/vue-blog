<template>
  <div v-html="content.content">
    <pre>
      <code class="language-java">
        public static void main(String[] args) {
        System.out.println(new BCryptPasswordEncoder().encode("123456"));
      }
      </code>
    </pre>
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
