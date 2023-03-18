import request from '@/utils/request'
export function getDepartment() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

export function getUserSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}
export function getAddSimple(data) {
  console.log(data)
  return request({

    url: '/company/department',
    method: 'post',
    data
  })
}
// 查询编辑部门数据
export function editSimple(id) {
  console.log(id)
  return request({
    url: `/company/department/${id}`,
    method: 'get'

  })
}
// 编辑部门数据
export function editBranch(data) {
  console.log(data)
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
export function delBranch(id) {
  console.log(id)
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
