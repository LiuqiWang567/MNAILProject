import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {}
  }),
  actions: {
    setToken(token) {
      this.token = token
      uni.setStorageSync('token', token)
    },
    setUserInfo(info) {
      this.userInfo = info
      uni.setStorageSync('userInfo', info)
    }
  }
})