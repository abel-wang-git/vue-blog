import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Prism from 'prismjs'
import '@/icons' // icon
import CKEditor from '@ckeditor/ckeditor5-vue'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(CKEditor)
Vue.config.productionTip = false
Vue.use(Prism)
Prism.highlightAll()

Vue.prototype.uploadUrl = process.env.VUE_APP_BASE_API + 'img/upload'
Vue.prototype.editorUpload = process.env.VUE_APP_BASE_API + 'upload'
Vue.prototype.editorToken = process.env.VUE_APP_BASE_API + 'gettoken'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
