import request from '@/utils/request'
import qs from 'qs'

const AppApi = {
  getList: function getList(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/app/list',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  add: function(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/app/add',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  addRelease: function(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/app/history/add',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  appIndex: function(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/app/index',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}
export default AppApi
