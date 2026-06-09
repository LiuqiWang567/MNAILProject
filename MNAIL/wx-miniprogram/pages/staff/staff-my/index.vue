<template>
  <view class="staff-my-container">
   

    <!-- 员工信息卡片 -->
    <view class="user-card card" @tap="goToInformation">
      <image class="avatar" src="/static/images/default-avatar.png" mode="widthFix"></image>
      <view class="info">
        <text class="name">美甲师 - 管理员</text>
        <text class="role">门店管理账号</text>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="menu-list card">
      <view class="menu-item" @click="goStoreInfo">
        <text class="text">{{ lang.staff.storeInfo }}</text>
        <text class="arrow">></text>
      </view>

      <view class="menu-item" @click="goResetPwd">
        <text class="text">{{ lang.staff.resetPwd }}</text>
        <text class="arrow">></text>
      </view>

      <view class="menu-item" @click="goAbout">
        <text class="text">{{ lang.staff.about }}</text>
        <text class="arrow">></text>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-box">
      <button class="btn-primary logout-btn" @click="logout">{{ lang.staff.logout }}</button>
    </view>
	<custom-tabbar />
	
  </view>
</template>

<script setup>
import { useUserStore } from "/store/index.js"
import CustomTabbar from "/components/custom-tabbar/index.vue"
import { ref } from 'vue'
import config from '@/config/index.js'
const lang = config.globalLang

// 获取用户信息
const store = useUserStore()
const userInfo = store.userInfo

const goToInformation = () => {
  uni.navigateTo({ url: '/pages/staff/staff-information/index' })
  
}
// 门店信息
const goStoreInfo = () => {
  uni.showModal({
    title: lang.staff.storeInfo,
    content: config.storeInfo.name + '\n地址：' + config.storeInfo.address + '\n电话：' + config.storeInfo.phone,
    showCancel: false
  })
}

// 修改密码
const goResetPwd = () => {
  uni.showToast({
    title: lang.staff.resetPwdTip,
    icon: 'none'
  })
}

// 关于
const goAbout = () => {
  uni.showModal({
    title: lang.staff.about,
    content: '美甲店预约管理系统 v1.0',
    showCancel: false
  })
}

// 退出登录
const logout = () => {
  uni.showModal({
    title: lang.staff.logoutTipTitle,
    content: lang.staff.logoutTip,
    success: (res) => {
      if (res.confirm) {
        uni.reLaunch({
          url: '/pages/login/index'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/common/global.scss';

.staff-my-container {
  min-height: 100vh;
  background: $bg-light;
  padding-bottom: 40rpx;
}

/* 员工信息卡片 */
.user-card {
  display: flex;
  align-items: center;
  margin: 30rpx;
  padding: 30rpx;
  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-right: 24rpx;
  }
  .info {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 32rpx;
      font-weight: bold;
      color: $text-main;
    }
    .role {
      font-size: 24rpx;
      color: $text-secondary;
      margin-top: 8rpx;
    }
  }
}

/* 菜单 */
.menu-list {
  margin: 0 30rpx 30rpx;
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1rpx solid $border-color;
    &:last-child {
      border-bottom: none;
    }
    .text {
      font-size: 28rpx;
      color: $text-main;
    }
    .arrow {
      color: $text-secondary;
      font-size: 26rpx;
    }
  }
}

/* 退出按钮 */
.logout-box {
  padding: 0 30rpx;
  margin-top: 60rpx;
  .logout-btn {
    border-radius: 12rpx;
  }
}
</style>