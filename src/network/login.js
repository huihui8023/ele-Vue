import { request } from './request'

// 获取验证码
export function _getVerifyCode(phone) {
  return request({
    method: 'post',
    url: "/api/posts/sms_send",
    data: {
      phone
    }
  })
}

export function _verifyCode(phone, code) {
  return request({
    method: 'post',
    url: "/api/posts/sms_back",
    data: {
      phone,
      code
    }
  })
}