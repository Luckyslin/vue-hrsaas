import Layout from '@/layout'

export default// # 社保管理
{
  path: '/social_securitys',
  component: Layout,

  children: [{
    path: '',
    name: 'social_securitys',
    component: () => import('@/views/social_securitys/index'),
    meta: { title: '社保管理', icon: 'table' }
  }]
}
