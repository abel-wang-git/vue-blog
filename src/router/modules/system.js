import Layout from '@/layout'

const sysRouter = {
  path: '/sys',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Table',
  meta: {
    title: '系统设置',
    icon: 'system-setting',
    roles: ['admin']
  },
  children: [
    {
      path: '/sys/role',
      component: () => import('@/views/system/role/list'),
      name: 'role',
      meta: { title: '角色管理' }
    },
    {
      path: '/sys/user',
      component: () => import('@/views/system/user/list'),
      name: 'power',
      meta: { title: '用户管理' }
    },
    {
      path: '/sys/dept',
      component: () => import('@/views/system/dept/list'),
      name: 'dept',
      meta: { title: '组织机构' }
    },
    {
      path: '/sys/app',
      component: () => import('@/views/system/app/list'),
      name: 'app',
      meta: { title: 'app列表' }
    },
    {
      path: '/sys/app/add',
      component: () => import('@/views/system/app/add'),
      name: 'appadd',
      hidden: true,
      meta: { title: 'app添加' }
    },
    {
      path: '/sys/white/list',
      component: () => import('@/views/system/whiteList/list'),
      name: 'whiteList',
      hidden: false,
      meta: { title: '白名单管理' }
    },
    {
      path: '/app/history/add',
      component: () => import('@/views/system/app/release'),
      name: 'historyadd',
      hidden: true,
      meta: { title: 'app发布' }
    }
  ]
}
export default sysRouter
