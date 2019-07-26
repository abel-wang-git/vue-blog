import request from '@/utils/request'
import qs from 'qs'

export function getList(params) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/role/list',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function powerList() {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/power/list',
    method: 'post'
  })
}

export function rolePowerList(params) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/role/get/power',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function addPower(params) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/role/add/power',
    method: 'post',
    data: qs.stringify(params)
  })
}

