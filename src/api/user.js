import request from '@/utils/request'
import qs from 'qs'

export function toLogin(data) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: 'login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/user/get',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getList(params) {
  return request({
    url: '/user/list',
    method: 'post',
    data: qs.stringify(params)
  })
}
