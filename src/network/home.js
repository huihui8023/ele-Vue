import { request } from './request'

export function _getHomeSwiper() {
  return request({
    url: '/api/profile/shopping'
  })
}

export function _getHomeFilter() {
  return request({
    url: '/api/profile/filter'
  })
}

export function _getHomeShopInfo(page = 1, size = 5, rule) {
  return request({
    method: 'post',
    url: `/api/profile/restaurants/${page}/${size}`,
    data: {
      condition: rule.condition
    }
  })
}