import request from '@/utils/request'
import qs from 'qs'

export function getList(params) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/article/list',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function save(params) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/article/add',
    method: 'post',
    data: qs.stringify(params)
  })
}


export function update(params) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/article/update',
    method: 'post',
    data: qs.stringify(params)
  })
}
