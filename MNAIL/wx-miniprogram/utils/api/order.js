import { get, post, put } from '../request.js'

/**
 * 获取订单列表
 * @param {object} params 查询参数（分页、状态等）
 * @returns {Promise} 订单列表数据
 */
export const getOrderList = (params) => {
  return get('/Order/list', params)
}

/**
 * 创建订单
 * @param {object} orderData 订单信息
 * @returns {Promise} 创建结果
 */
export const createOrder = (orderData) => {
  return post('/Order/create', orderData, { showLoading: true })
}

/**
 * 更新订单状态
 * @param {number} orderId 订单ID
 * @param {number} status 目标状态
 * @returns {Promise}
 */
export const updateOrderStatus = (orderId, status) => {
  return put(`/Order/${orderId}/status`, { status })
}