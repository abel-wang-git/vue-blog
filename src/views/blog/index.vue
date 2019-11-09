<template>
  <div>
    <div class="shell" v-for="(item,index) in history" v-bind:key="index">
      <span>
        <span>[root@blog]</span>
        <span class="preblank">&nbsp;</span>
      </span>
      <span>{{item.cmd}}</span>
      <div v-for="(result,index) in item.results" v-bind:key="index">
        {{result.title}}
      </div>
    </div>
    <div class="shell">
      <span>
        <span>[root@blog]</span>
        <span class="preblank">&nbsp;</span>
      </span>
      <input @keyup.enter="enter()" class="input-text" contenteditable="" spellcheck="false" autocomplete="off" autocorrect="off" style="padding-right: 45px;" v-model="command"/>
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
              console.log(response)
              his.results = response.data.list
            }
          }
          this.history.push(his)
        })
      }
      if (this.command === 'add') {
        this.$router.push({ path: '/article/add' })
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
