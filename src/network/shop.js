import { request } from './request'

export function _getShopInfoData() {
  return request({
    url: '/api/profile/batch_shop'
  })
}

export function _getShopComments() {
  return request({
    url: '/api/profile/comments'
  })
}

export function _getShopSeller() {
  return request({
    url: '/api/profile/seller'
  })
}