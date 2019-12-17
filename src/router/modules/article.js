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
    }
  ]
}
export default articleRouter
