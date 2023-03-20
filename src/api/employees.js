import request from '@/utils/request'
export function getEmpployees(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}

