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
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', roles: ['admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/console',
    name: 'blog',
    hidden: true,
    component: () => import('@/views/blog/index'),
    meta: { title: 'blog', icon: 'dashboard' }
  },
  {
    path: '/',
    name: 'blogindex',
    hidden: true,
    component: () => import('@/views/blog/blog'),
    meta: { title: 'blog', icon: 'dashboard' }
  },
  {
    path: '/article/detail/:id',
    component: () => import('@/views/blog/detail'),
    name: 'AtricleDetail',
    hidden: true,
    meta: { title: '文章详情' }
  },
  {
    path: '/article/add',
    component: () => import('@/views/blog/add'),
    name: 'ArticleAdd',
    hidden: true,
    meta: { title: '文章添加' }
  },
  {
    path: '/article/update',
    component: () => import('@/views/blog/update'),
    name: 'ArticleUpdate',
    hidden: true,
    meta: { title: '文章修改' }
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export const asyncRoutes = [
  articleRouter,
  systemRoutes,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
