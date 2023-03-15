import Layout from '@/layout'

export default {
  // # 考勤管理

  path: '/attendances',
  component: Layout,

  children: [{
    path: '',
    name: 'attendances',
    component: () => import('@/views/attendances/index'),
    meta: { title: '考勤管理', icon: 'skill' }
  }]

}
