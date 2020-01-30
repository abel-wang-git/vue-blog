import request from '@/utils/request'
import qs from 'qs'

const DeptApi = {
  getList: function getList(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/sys/department/list',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  add: function(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/sys/department/add',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  update: function(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/sys/department/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  del: function(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/sys/whitelist/delete',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}
export default DeptApi
