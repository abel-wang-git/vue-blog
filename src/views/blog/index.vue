<template>
  <div>
    <div v-for="(item,index) in history" :key="index" class="shell">
      <span>
        <span>[root@blog]</span>
        <span class="preblank">&nbsp;</span>
      </span>
      <span>{{ item.cmd }}</span>
      <div v-for="(result,i) in item.results" :key="i">
        {{ result.title }}
        {{ result.articleId }}
      </div>
    </div>
    <div class="shell">
      <span>
        <span>[root@blog]</span>
        <span class="preblank">&nbsp;</span>
      </span>
      <input v-model="command" class="input-text" contenteditable="" spellcheck="false" autocomplete="off" autocorrect="off" style="padding-right: 45px;" @keyup.enter="enter()">
    </div>
  </div>
</template>

<script>
import ArticleApi from '@/api/article'
export default {
  name: 'BlogList',
  data() {
    return {
      history: [],
      command: ''
    }
  },
  methods: {
    enter() {
      if (this.command === 'ls') {
        var his = {}
        his.cmd = this.command
        ArticleApi.list().then(response => {
          if (response.code === 200) {
            if (response.data.total > 0) {
              his.results = response.data.list
            }
          }
          this.history.push(his)
        })
      }
      if (this.command === 'add') {
        this.$router.push({ path: '/article/add' })
      }
      if (this.command.split(' ')[0] === 'cat') {
        this.$router.push({ path: '/article/detail', query: { id: this.command.split(' ')[1] }})
      }
      this.command = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .shell {
    height: 100%;
    width: 100%;
  }

  .preblank {
    cursor: text;
  }
</style>
