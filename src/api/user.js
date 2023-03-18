import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 根据id获取头像
export function getAvatar(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'get'
  })
}
// export function getDepartment() {
//   return request({
//     url: '/company/department'

//   })
// }
