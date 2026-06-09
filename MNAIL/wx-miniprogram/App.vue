<script setup>
import { onLaunch } from '@dcloudio/uni-app'
import { useUserStore } from "./store/index.js"

// 必须写在 APP 启动生命周期里 + 安全访问
onLaunch(() => {
  try {
    // 1. 正确调用仓库
    const store = useUserStore()

    // 2. 正确取值（不加 .state）
    const token = store.token || ''
    const userInfo = store.userInfo || {}

    console.log('token=', token)
    console.log('userInfo=', userInfo)

    // 3. 安全判断
    if (token && userInfo.username) {
      console.log('已登录，自动跳转:', userInfo.isAdmin)
      
      // 必须加延时，否则小程序渲染异常
      setTimeout(() => {
        if (userInfo.isAdmin) {
          uni.switchTab({ url: "/pages/staff/staff-index/index" })
        } else {
          uni.switchTab({ url: "/pages/user/user-index/index" })
        }
      }, 300)
      
    } else {
      console.log('未登录，去登录页')
      setTimeout(() => {
        uni.reLaunch({ url: "/pages/login/index" })
      }, 300)
    }
  } catch (err) {
    console.error('启动判断身份出错:', err)
    uni.reLaunch({ url: "/pages/login/index" })
  }
})
</script>

<template>
  <!-- 必须留空 -->
  <view></view>
</template>

<style>
page {
  background-color: #f7f7f7;
}
</style>