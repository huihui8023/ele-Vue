import axios from 'axios'
import { Loading } from 'element-ui';

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    // baseURL: 'https://eleme1-october.herokuapp.com/',
    // timeout: 5000
  })

  // 2.axios拦截器
  // 2.1 请求拦截
  var loadingInstance //Loading服务
  instance.interceptors.request.use(config => {
    loadingInstance = Loading.service();
    return config
  }), err => {
    console.log(err);
  }
  // 2.2 响应拦截
  instance.interceptors.response.use(response => {
    loadingInstance.close()
    return response
  }, err => {
    console.log(err);
  })

  return instance(config)
}