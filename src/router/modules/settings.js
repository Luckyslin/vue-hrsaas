import Layout from '@/layout'

export default// # 公司设置
{
  path: '/settings',
  component: Layout,

  children: [{
    path: '',
    name: 'settings',
    component: () => import('@/views/settings/index'),
    meta: { title: '公司设置', icon: 'settings' }
  }]
}
