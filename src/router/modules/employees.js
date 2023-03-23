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
  }, {
    path: 'Import',
    name: 'emImport',
    hidden: true,
    component: () => import('@/views/employees/emImport.vue'),
    meta: { title: 'Excel导入', icon: 'people' }}]
}
