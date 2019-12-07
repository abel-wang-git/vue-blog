import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getName } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/blog', '/', '/article/detail/*'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log('4')
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/dashboard' })
      NProgress.done()
    } else {
      const hasGetUserInfo = getName()
      console.log(hasGetUserInfo)
      if (hasGetUserInfo) {
        console.log('6')
        next()
      } else {
        try {
          // get user info
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          console.log('7')
          next({ path: '/dashboard', replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    var iswhite = whiteList.some(function(item) {
      console.log('1')
      var end = new RegExp('(.*)/')
      if (item.endsWith('/')) {
        item = item.replace(end, '$1/?')
      }
      if (!item.endsWith('*')) {
        item += '$'
      }
      // item = item.replace('/', '\\/')
      var patt = new RegExp('^' + item)
      if (patt.test(to.path)) {
        // in the free login whitelist, go directly
        console.log('2')
        next()
        return true
      }
    })
    // other pages that do not have permission to access are redirected to the login page.
    if (!iswhite) {
      console.log('3')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
      return true
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
