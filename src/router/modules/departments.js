import Layout from '@/layout'

export default// 组织架构
{
  path: '/departments',
  component: Layout,

  children: [{
    path: '',
    name: 'departments',
    component: () => import('@/views/departments/index'),
    meta: { title: '组织架构', icon: 'tree' }
  }]
}
