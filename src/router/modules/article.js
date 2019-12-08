import Layout from '@/layout'

const articleRouter = {
  path: '/article',
  component: Layout,
  redirect: '/article/list',
  name: 'Article',
  meta: {
    title: '文章管理',
    icon: 'system-setting'
  },
  children: [
    {
      path: '/article/list',
      component: () => import('@/views/blog/list'),
      name: 'ArticleList',
      hidden: false,
      meta: { title: '文章列表' }
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
    }
  ]
}
export default articleRouter
