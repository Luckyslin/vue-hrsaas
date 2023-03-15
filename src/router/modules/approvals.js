import Layout from '@/layout'

export default // # 审批管理
{
  path: '/approvals',
  component: Layout,

  children: [{
    path: '',
    name: 'approvals',
    component: () => import('@/views/approvals/index'),
    meta: { title: '审批管理', icon: 'tree-table' }
  }]
}
