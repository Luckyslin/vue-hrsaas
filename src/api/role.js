import request from '@/utils/request'

export function getRole(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}
export function delRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
export function addRole(data) {
  console.log(data)
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
