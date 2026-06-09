import config from '@/config/index.js'

const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.baseUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Authorization': 'Bearer ' + uni.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      success: res => {
        if (res.statusCode === 401) {
          uni.removeStorageSync('token')
          uni.navigateTo({ url: '/pages/login/index' })
          return
        }
        resolve(res.data)
      },
      fail: err => reject(err)
    })
  })
}
// 封装常用请求方法，方便调用
export const get = (url, data, options = {}) => {
  return request({ url, method: 'GET', data, ...options })
}

export const post = (url, data, options = {}) => {
  return request({ url, method: 'POST', data, ...options })
}

export const put = (url, data, options = {}) => {
  return request({ url, method: 'PUT', data, ...options })
}

export const del = (url, data, options = {}) => {
  return request({ url, method: 'DELETE', data, ...options })
}
export default request