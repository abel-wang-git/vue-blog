import request from '@/utils/request'
import qs from 'qs'

const Whitelist = {
  getList: function getList(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/sys/whitelist/list',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  add: function(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/sys/whitelist/add',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  update: function(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/sys/whitelist/update',
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
export default Whitelist
