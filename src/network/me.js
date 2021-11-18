import { request } from './request'

export function _getUserData(id) {
  return request({
    url: `/api/user/user_info/${id}`,
  })
}

export function _editUserData(local_id, id, address) {
  return request({
    method: 'post',
    url: `/api/user/edit_address/${local_id}/${id}`,
    data: {
      ...address
    }
  })
}