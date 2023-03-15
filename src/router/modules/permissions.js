import Layout from '@/layout'

export default // # 权限管理
{
  path: '/permissions',
  component: Layout,

  children: [{
    path: '',
    name: 'permissions',
    component: () => import('@/views/permissions/index'),
    meta: { title: '权限管理', icon: 'lock' }
  }]
}
