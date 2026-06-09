import { post, get } from '../request.js'

/**
 * 用户登录接口
 * @param {string} username 账号
 * @param {string} password 密码
 * @returns {Promise} 登录结果，包含token、用户信息
 */
export const login = (username, password) => {
  return post('/Staff/login', { username, password }, { showLoading: true })
}

/**
 * 获取用户信息接口
 * @returns {Promise} 用户详情
 */
export const getUserInfo = () => {
  return get('/User/info')
}

/**
 * 修改用户密码接口
 * @param {string} oldPassword 旧密码
 * @param {string} newPassword 新密码
 * @returns {Promise}
 */
export const updatePassword = (oldPassword, newPassword) => {
  return post('/User/updatePassword', { oldPassword, newPassword })
}