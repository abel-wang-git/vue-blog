import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import systemRoutes from './modules/system'

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
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '医联通', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/article',
    component: Layout,
    redirect: 'noRedirect',
    name: 'article',
    meta: { title: '文章管理', icon: 'dashboard' },
    children: [
      {
        path: '/article/list',
        name: 'articlelist',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表', icon: 'dashboard' }
      },
      {
        path: 'article/add',
        name: 'articleadd',
        component: () => import('@/views/article/add'),
        meta: { title: '文章添加', icon: 'dashboard', roles: ['admin2'] }
      }
    ]
  },
  systemRoutes,
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
