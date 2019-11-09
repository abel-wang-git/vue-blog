import request from '@/utils/request'
import qs from 'qs'

const ArticleApi = {
  list: function getList(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/list/list',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  save: function save(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/list/add',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  update: function update(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/update',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}
export default ArticleApi
