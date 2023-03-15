import Layout from '@/layout'

export default// # 员工管理
{
  path: '/employees',
  component: Layout,

  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees/index'),
    meta: { title: '员工管理', icon: 'people' }
  }]
}
