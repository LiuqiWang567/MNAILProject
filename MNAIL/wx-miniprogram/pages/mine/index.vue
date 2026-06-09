<template>
  <view class="container">
    <!-- 用户信息卡片 -->
    <view class="card user-card">
      <view class="title">个人信息</view>
      <view class="info-item">
        <text>登录账号：</text>
        <text class="info-value">{{ userStore.userInfo.username }}</text>
      </view>
      <view class="info-item">
        <text>身份：</text>
        <text class="info-tag" :class="userStore.userInfo.isAdmin ? 'admin-tag' : 'staff-tag'">
          {{ userStore.userInfo.isAdmin ? '管理员' : '普通员工' }}
        </text>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-btn" @click="logout">
      <text>退出登录</text>
    </view>
  </view>
</template>

<script setup>
import { useUserStore } from '/store/index.js'

// 【修复】必须加括号调用
const userStore = useUserStore()

// 退出登录
const logout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout() // 调用store里的退出方法
        
        // 退出后跳回登录页
        uni.reLaunch({
          url: '/pages/login/index'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import '/styles/theme.scss';

.container {
  padding: 20rpx;
  background-color: #f7f7f7;
  min-height: 100vh;
}

/* 用户卡片 */
.user-card {
  margin-top: 30rpx;
  padding: 40rpx 30rpx;
  background: #fff;
  border-radius: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  color: #333;
}

.info-item {
  font-size: 30rpx;
  color: #666;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
}

.info-value {
  color: #333;
  font-weight: 500;
}

/* 身份标签 */
.info-tag {
  padding: 6rpx 16rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  color: #fff;
}

.admin-tag {
  background-color: $primary;
}

.staff-tag {
  background-color: #10b981;
}

/* 退出按钮 */
.logout-btn {
  margin-top: 60rpx;
  height: 88rpx;
  background-color: #fff;
  border: 2rpx solid $primary;
  color: $primary;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
}
</style>