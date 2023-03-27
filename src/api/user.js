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
// 根据id获取获取员工基本信息
export function getAvatar(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'get'
  })
}
/**
 *
 * @param {更新用户基本信息} data
 * @returns 更新结果
 */
export function updataUserInfo(data) {
  return request({
    url: '/sys/user/' + data.id,
    method: 'put',
    data
  })
}
