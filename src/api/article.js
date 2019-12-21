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
  index: function index(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/list/index',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  classList: function getList(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/class/list',
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
  addClass: function addClass(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/class/add',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  update: function update(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/list/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  detail: function detail(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/list/detail',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  addComment: function addComment(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/comment/add',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  listComment: function addComment(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/comment/list',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  like: function like(params) {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/article/like/add',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}
export default ArticleApi
