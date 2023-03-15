import Layout from '@/layout'

export default// # 工资管理
{
  path: '/salarys',
  component: Layout,

  children: [{
    path: '',
    name: 'salarys',
    component: () => import('@/views/salarys/index'),
    meta: { title: '工资管理', icon: 'money' }
  }]
}
