import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import systemRoutes from './modules/system'
import articleRouter from './modules/article'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: 'noRedirect',
    children: [{
      path: '',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '医联通', icon: 'dashboard' }
    }]
  },
  {
    path: '/',
    name: 'blog',
    component: () => import('@/views/blog/index'),
    meta: { title: '医联通', icon: 'dashboard' }
  },
  {
    path: '/article/add',
    component: () => import('@/views/blog/add'),
    name: 'AtricleAdd',
    hidden: true,
    meta: { title: '文章添加' }
  },
  {
    path: '/article/detail',
    component: () => import('@/views/blog/detail'),
    name: 'AtricleDetail',
    hidden: true,
    meta: { title: '文章详情' }
  }
]

export const asyncRoutes = [
  systemRoutes,
  // articleRouter,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
