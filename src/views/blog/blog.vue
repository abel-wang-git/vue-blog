<template>
  <div class="fullpage-container">
    <div ref="example" v-fullpage="opts" class="fullpage-wp">
      <div class="page-1 page index-header">
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 24, offset: 0}"
          :md="{span: 16, offset: 4}"
          :lg="{span: 16, offset: 4}"
          :xl="{span: 12, offset: 6}"
        >
          <div class="index-title">我的博客</div>
          <div class="index-title2">君子务本,本立而道生</div>
        </el-col>
      </div>
      <div class="page-2 page">
        <el-col
          :xs="{span: 18, offset: 3}"
          :sm="{span: 18, offset: 3}"
          :md="{span: 18, offset: 3}"
          :lg="{span: 18, offset: 3}"
          :xl="{span: 18, offset: 3}"
        >
          <el-col
            v-for="article in articles"
            :key="article.id"
            :xs="{span: 6}"
            :sm="{span: 6}"
            :md="{span: 6}"
            :lg="{span: 6}"
            :xl="{span: 6}"
          >
            <div class="article-card">
              <el-image
                :src="article.url"
                fit="cover"
              />
              <div>
                <span>{{ article.title }}</span>
                <time class="time">2019-11-11</time>
              </div>
            </div>
          </el-col>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleApi from '@/api/article'

export default {
  name: 'BlogList',
  data() {
    return {
      articles: [
        { id: 1, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 2, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 3, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 4, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 5, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 7, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 8, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 9, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 10, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 11, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 12, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 13, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { id: 14, title: 123, url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' }
      ],
      opts: {
        start: 0,
        dir: 'v',
        duration: 500,
        beforeChange: function(currentSlideEl, currenIndex, nextIndex) {
        },
        afterChange: function(currentSlideEl, currenIndex) {
        }
      }

    }
  },
  methods: {
    enter() {
      ArticleApi.list().then(response => {
        if (response.code === 200) {
          if (response.data.total > 0) {
            this.articles = response.data.list
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .shell {
    height: 100%;
    width: 100%;
  }

  .preblank {
    cursor: text;
  }

  .fullpage-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .index-header {
    background-image: url("~@/assets/blog/background-index.png");
    background-color: #1f2d3d;
    height: 100vh;
    width: 100vw;
  }

  .index-title {
    color: white;
    font-size: 30px;
    padding-top: 30vh;
  }

  .index-title2 {
    color: white;
    font-size: 15px;
  }

  .article-card {
    margin: 10px;
    border: solid 1px #bfbfbf;
  }
</style>
