import { request } from './request'

export function _getCities() {
  return request({
    url: '/api/posts/cities'
  })
}