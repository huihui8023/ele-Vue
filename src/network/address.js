import { request } from './request'

export function _sendAddress(id, addressInfo) {
  return request({
    method: 'post',
    url: `/api/user/add_address/${id}`,
    data: {
      ...addressInfo
    }
  })
}