<template>
  <div class="article">
    <div class="">
      <div class="index-header">
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 24, offset: 0}"
          :md="{span: 16, offset: 4}"
          :lg="{span: 16, offset: 4}"
          :xl="{span: 12, offset: 6}"
        >
          <div class="index-title">程序员的博客</div>
          <div class="index-title2">君子务本，本立而道生</div>
        </el-col>
      </div>
      <div class="article-list">
        <el-col
          :xs="{span: 24, offset: 0}"
          :sm="{span: 24, offset: 0}"
          :md="{span: 20, offset: 2}"
          :lg="{span: 18, offset: 3}"
          :xl="{span: 18, offset: 3}"
        >
          <el-col
            v-for="article in articles"
            :key="article.articleId"
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
            :lg="{span: 6}"
            :xl="{span: 6}"
            style="padding: 10px;"
          >
            <div class="article-card" @click="detail(article.articleId)">
              <div class="article-card-content">
                <img
                  :src="article.coverPicture"
                  style="width: 100%"
                />
                <div class="article-bottom">
                  <div class="blog-title">{{ article.title }}</div>
                  <div class="blog-detail">
                    <span class="blog-detail-icon">
                      <svg-icon icon-class="chat" />
                      0
                    </span>
                    <span class="blog-detail-icon">
                      <svg-icon icon-class="eye-open" />
                      {{ article.hot === null? 0: article.hot }}
                    </span>
                    <span class="blog-detail-icon">
                      <svg-icon icon-class="like" />
                      0
                    </span>
                  </div>
                  <div class="blog-time">2019-11-11</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-col>
      </div>
      <transition-group
        name="staggered-fade"
        tag="div"
        class="bottom-menu"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div v-for="item in items" :key="item" class="menu-list" @click="menu(item)">
          {{ item }}
        </div>
      </transition-group>
      <div class="add-bottom" @click="add()">
        <svg-icon icon-class="add" class="add-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleApi from '@/api/article'
import Velocity from 'velocity-animate'
export default {
  name: 'BlogList',
  data() {
    return {
      pox: 0,
      articles: [],
      items: []
    }
  },
  mounted() {
    ArticleApi.list().then(response => {
      if (response.code === 200) {
        if (response.data.total > 0) {
          this.articles = response.data.list
        }
      }
    })
  },
  methods: {
    detail(id) {
      this.$router.push({ path: '/article/detail', query: { id: id }})
    },
    menu(t) {
      if (t === '添加') {
        this.$router.push({ path: '/article/add' })
      }
    },
    add: function() {
      if (this.items.length > 0) {
        this.items = []
      } else {
        this.items.push('全部')
        this.items.push('添加')
      }
    },
    beforeEnter: function(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function() {
        Velocity(
          el,
          { opacity: 1, height: '50px' },
          { complete: done }
        )
      }, delay)
    },
    leave: function(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function() {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}
</script>

<style scoped>
  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
    animation-delay: 1s;
  }

  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(100px);
  }

  .article {
    width: 100vw;
  }

  .index-header {
    background-image: url("~@/assets/blog/background-index.png");
    background-size: cover;
    background-color: #1f2d3d;
    height: 50vh;
    width: 100vw;
  }

  .index-title {
    color: white;
    font-size: 3rem;
    padding-top: 25vh;
  }

  .index-title2 {
    color: white;
    font-size: 1.5rem;
  }

  .article-card {
    width: 100%;
    padding-bottom: 80.25%;
    height: 0;
    position: relative;
    border: solid 1px #929292;
    border-radius: 15px;
    overflow: hidden;
  }

  .article-card-content {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .el-image {
    height: 100%;
    width: 100%;
  }

  .blog-title {
    font-size: 1.5rem;
    padding-left: 1rem;
    padding-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .blog-detail {
    font-size: 0.7rem;
    padding-left: 1rem;
    padding-top: 10px;
  }

  .blog-time {
    font-size: 0.7rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 5px;
    text-align: right;
  }

  .article-bottom {
    position: absolute;
    bottom: 0;
    background-color: white;
    width: 100%;
  }

  .article-list {
    padding-top: 10px;
  }

  .blog-detail-icon {
    margin-left: 5px;
    margin-right: 5px;
  }

  .add-bottom {
    border-radius: 35px;
    background-color: #409EFF;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 25px;
    right: 25px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }

  .add-icon {
    color: white;
  }

  .bottom-menu {
    position: fixed;
    bottom: 75px;
    right: 25px;
    cursor: pointer;
  }

  .menu-list {
    color: white;
    border-radius: 35px;
    background-color: #409EFF;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
</style>
