import request from '@/utils/request'
export function getEployees(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}
export function delEmployees(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'delete'
  })
}
export function addEmployees(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
export function addimport(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

