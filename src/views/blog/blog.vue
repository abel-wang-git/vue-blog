<template>
  <div class="article">
    <div class="index-header animated fadeInDown delay-2s">
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
      <div class="article-index-bar">
        <a class="article-index-bar-item" href="https://github.com/wanghuiwen1" target="_blank">
          <svg-icon icon-class="github" />
        </a>
        <span v-if="isLogin()" class="article-index-bar-item" @click="loginVisible=true">
          <svg-icon icon-class="login" />
        </span>
      </div>
    </div>
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
        class="animated fadeInUp delay-2s"
      >
        <div class="article-card" @click="detail(article.articleId)">
          <div class="article-card-content">
            <img
              :src="article.coverPicture"
              style="width: 100%"
            >
            <div class="article-bottom">
              <div class="blog-title">{{ article.title }}</div>
              <div class="blog-detail">
                <span class="blog-detail-icon">
                  <svg-icon icon-class="chat" />
                  {{ article.comments === null? 0: article.comments }}
                </span>
                <span class="blog-detail-icon">
                  <svg-icon icon-class="hot" />
                  {{ article.hot === null? 0: article.hot }}
                </span>
                <span class="blog-detail-icon">
                  <svg-icon icon-class="like" />
                  {{ article.likes === null? 0: article.likes }}
                </span>
              </div>
              <div class="blog-time">{{ article.createTime!=null ?article.createTime.substring(0,10):'-' }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-col>
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
    <div v-if="checkPermission(['admin'])" class="add-bottom" @click="add()">
      <svg-icon icon-class="add" class="add-icon" />
    </div>
    <el-dialog title="请先登录" :visible.sync="loginVisible" :width="dialogWidth">
      <login :visible="loginVisible" @setVisible="setVisible" />
    </el-dialog>
  </div>
</template>

<script>
import Login from './login'
import ArticleApi from '@/api/article'
import Velocity from 'velocity-animate'
import checkPermission from '@/utils/permission'
import store from '@/store'

export default {
  name: 'BlogList',
  components: { Login },
  data() {
    return {
      pox: 0,
      articles: [],
      items: [],
      loginVisible: false,
      dialogWidth: '0'
    }
  },
  mounted() {
    ArticleApi.index().then(response => {
      if (response.code === 200) {
        if (response.data.total > 0) {
          this.articles = response.data.list
        }
      }
    })
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
    if (document.body.clientWidth < 768) {
      this.dialogWidth = '100%'
    } else {
      this.dialogWidth = '400px'
    }
  },
  methods: {
    checkPermission,
    isLogin() {
      const token = store.getters && store.getters.token
      if (token) {
        return false
      }
      return true
    },
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
    },
    setDialogWidth() {
      var val = document.body.clientWidth
      const def = 800 // 默认宽度
      if (val < def) {
        this.dialogWidth = '100%'
      } else {
        this.dialogWidth = def + 'px'
      }
    },
    setVisible(val) {
      this.loginVisible = val
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
    display: flex;
    flex-direction: column;
    background-image: url("~@/assets/blog/background-index.png");
    background-color: #1f2d3d;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .index-header {
    background-color: rgba(162, 162, 162, 0.85);
    background-size: cover;
    height: 50vh;
    width: 100vw;
    position: relative;
  }

  .index-title {
    color: white;
    font-size: 3rem;
    padding-top: 20vh;
    padding-bottom: 1rem;
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
    /*border: solid 1px #929292;*/
    border-radius: 10px;
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
    font-size: 1rem;
    padding-left: 1rem;
    padding-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(27, 27, 27, 0.84);
  }

  .blog-detail {
    border-bottom: solid 1px #d6cece;
    padding-bottom: 5px;
    font-size: 0.7rem;
    padding-left: 1rem;
    padding-top: 10px;
  }

  .blog-time {
    color: #8a8a8a;
    padding-top: 5px;
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

  .blog-detail-icon {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 0.8rem;
    color: #8a8a8a;
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
  .article-index-bar{
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    height: 2rem;
    line-height: 2rem;
  }
  .article-index-bar-item{
    font-size: 1.5rem;
    color: white;
  }
</style>
