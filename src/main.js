import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import CKEditor from '@ckeditor/ckeditor5-vue'

import animated from 'animate.css'

Vue.use(animated)
Vue.use(ElementUI, { locale })
Vue.use(CKEditor)
Vue.config.productionTip = false

Vue.prototype.uploadUrl = process.env.VUE_APP_BASE_API + 'img/upload'
Vue.prototype.apkUploadUrl = process.env.VUE_APP_BASE_API + 'apk/upload'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
