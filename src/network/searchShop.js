import { request } from '@/network/request.js'

export function _getSearchShop(key_words) {
  return request({
    url: `/api/profile/typeahead/${key_words}`
  })
}