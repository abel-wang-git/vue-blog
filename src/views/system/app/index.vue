<template>
  <van-row>
    <van-col span="24">
      <van-row v-if="isWx" class="header" type="flex" justify="center" align="center">
        <van-col style="min-width: 75%;">
          <van-row class="header__container">
            <van-col span="22" style="text-align: center;">
              <p style="display: inline-block; text-align: left;">点击右上角按钮，然后在弹出的菜单中，点击在{{ isApple ? ' Safari ' : '浏览器' }}中打开，即可安装</p>
            </van-col>
          </van-row>

          <van-row class="alert-arrow">
            <van-col span="24">
              <van-image style="margin-top: -38px;" width="100%" :src="require('../../../assets/app/alert-arrow.png')" />
            </van-col>
          </van-row>
        </van-col>
      </van-row>

      <van-row class="body" :style="isPC ? 'max-width: 375px; border: solid 1px #ccc; margin: 0 auto; margin-top: 10px;' : '' ">
        <van-col span="24">
          <van-row class="body__header">
            <van-col span="24">
              <van-row type="flex" justify="center" align="center">
                <van-image width="20" height="20" fill="contain" :src="require('../../../assets/app/android.png')" />
                <van-col>
                  <h2 class="app_name">{{ app && app.name }}</h2>
                </van-col>
              </van-row>
              <van-row class="font-color-gray" type="flex" justify="center">
                <van-col>版本： {{ history[currentIndex] && history[currentIndex].version }}</van-col>
              </van-row>
              <van-row class="font-color-gray" style="margin-top: 10px;" type="flex" justify="center">
                <van-col>更新时间： {{ history[currentIndex] && history[currentIndex].createDate }}</van-col>
              </van-row>
              <van-row style="margin-top: 30px;" type="flex" justify="center">
                <van-col>
                  <van-image
                    width="150"
                    height="150"
                    :src="history[currentIndex] && history[currentIndex].qrcode"
                    @click="previewImage(history[currentIndex].qrcode)"
                  />
                </van-col>
              </van-row>
              <van-row style="margin-top: 15px" type="flex" justify="center">
                <van-col>
                  <van-button style="padding: 0 50px;" type="primary" round :url="history[currentIndex] && history[currentIndex].url">
                    <span style="font-weight: 600;">点击安装</span>
                  </van-button>
                </van-col>
              </van-row>
              <van-row class="font-color-gray" style="margin-top: 10px" type="flex" justify="center">
                <van-col>
                  <span>或者用手机扫描二维码安装</span>
                </van-col>
              </van-row>
              <van-row style="margin-top: 30px;">
                <van-cell-group>
                  <van-field
                    :value="app.indexUrl"
                    center
                    readonly="readonly"
                    @focus="onfocus($event)"
                  >
                    <van-button slot="button" v-clipboard:copy="app.indexUrl" v-clipboard:success="copySuccess" size="small" type="primary">复制链接</van-button>
                  </van-field>
                </van-cell-group>
              </van-row>
            </van-col>
          </van-row>

          <van-row style="margin-top: 30px;">
            <van-col span="24">
              <van-row>
                <van-col offset="1">
                  <h2 class="app_name">历史版本</h2>
                </van-col>
              </van-row>
              <van-row class="history" style="margin-bottom: 20px;">
                <van-col span="24">
                  <van-row v-for="(his, index) in history" :key="his.id">
                    <van-col span="24">
                      <van-cell :title="his.platform + ' ' + his.version + ' ' + his.createDate" is-link :value="index === currentIndex ? '当前版本' : '' " @click="changeCurrent(index)" />
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<script>
import AppApi from '@/api/app'
import { Row, Col, Cell, CellGroup, Image, Field, Button, Toast, Divider, ImagePreview } from 'vant'

export default {
  name: 'Index',

  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Divider.name]: Divider,
    [ImagePreview.name]: ImagePreview
  },

  data() {
    return {
      isPC: false,
      isWx: false,
      isApple: false,
      id: '',
      app: {},
      history: [],
      currentIndex: 0
    }
  },

  beforeCreate() {
    // 设置页面title
    document.title = this.$route.meta.title
  },

  created() {
    this.isPC = this.isPCFun()

    this.id = this.$route.params.id
    AppApi.appIndex({ id: this.id }).then(response => {
      if (response.code === 200) {
        this.app = response.data.app
        this.history = response.data.history
      }
    })
  },

  methods: {
    // 是否为PC端, 是否为微信浏览器，是否为苹果系产品
    isPCFun() {
      const userAgentInfo = navigator.userAgent
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      let flag = true
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }

      if (userAgentInfo.match(/MicroMessenger/i)) {
        this.isWx = true
      }

      if (userAgentInfo.match(/iPhone/i) || userAgentInfo.match(/iPad/i) || userAgentInfo.match(/iPod/i)) {
        this.isApple = true
      }

      return flag
    },

    // 改变版本
    changeCurrent(index) {
      this.currentIndex = index
    },

    // 复制链接成功
    copySuccess() {
      Toast('复制成功，快去分享给好友吧')
    },

    // 选中
    onfocus(event) {
      event.currentTarget.select()
    },

    // 图片预览
    previewImage(imgUrl) {
      ImagePreview({
        images: [imgUrl],
        startPosition: 0
      })
    }
  }
}
</script>

<style scoped>
.header {
  width: 100vw;
  height: 100px;
  background: rgb(52, 52, 52);
  color: #7f7e7e;
  padding: 0 20px 0 25px;
  word-break: break-all;
  position: relative;
}

.alert-arrow {
  width: 30px;
  position: absolute;
  top: 30px;
  right: 20px;
}

.body {
  background: url("./../../../assets/app/top_bg_mobile_ratio.png") top center no-repeat;
  background-size: 100% auto;
  font-family: NotoSansHans-Regular,AvenirNext-Regular,proxima-nova,"Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei","Open Sans","Helvetica Neue",Arial,sans-serif;
}

.body__header {
  margin-top: 50px;
}

.app_name {
  margin-left: 10px;
  color: #333;
  size: 24px;
  line-height: 24px;
  text-shadow: none;
  font-weight: 400;
}

.font-color-gray {
  color: #969b9d;
  font-size: 14px;
}

.history .van-cell__title {
  -webkit-box-flex: 4;
  -webkit-flex: 4;
  flex: 4;
}

.history .van-hairline--bottom::after {
  border-bottom-width: 2px;
}

.history [class*=van-hairline]::after {
  border-color: #000;
}
</style>
