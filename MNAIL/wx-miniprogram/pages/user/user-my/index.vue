<!-- pages/mine/index.vue -->
<template>
  <view class="container">
    <view class="user-info card" @tap="goToInformation">
      <image class="avatar" src="/static/images/default-avatar.png"></image>
      <text class="nickname">游客用户</text>
    </view>

    <view class="menu-list card">
      <view class="menu-item" @tap="goToMyAppointment">
        <text class="menu-text">{{lang.mine.myAppointment}}</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item" @tap="goToMyCollection">
        <text class="menu-text">{{lang.mine.myCollection}}</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item" @tap="showStoreNotice">
        <text class="menu-text">{{lang.mine.storeNotice}}</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item" @tap="showAboutUs">
        <text class="menu-text">{{lang.mine.aboutUs}}</text>
        <text class="arrow">></text>
      </view>
    </view>
	<custom-tabbar />
	
  </view>
</template>

<script setup>
import config from '@/config/index.js'
import CustomTabbar from '/components/custom-tabbar/index.vue'

const lang = config.globalLang

const goToInformation = () => {
  uni.navigateTo({ url: '/pages/user/user-information/index' })
  
}
const goToMyAppointment = () => {
	 uni.navigateTo({ url: '/pages/user/user-appointrecord/index' })
}

const goToMyCollection = () => {
  uni.showToast({ title: '收藏功能开发中', icon: 'none' })
}

const showStoreNotice = () => {
  uni.showModal({
    title: '门店须知',
    content: '1. 请提前预约，到店尽量准时；2. 临时改期请提前1小时联系；3. 美甲款式以门店实拍为准。',
    showCancel: false
  })
}

const showAboutUs = () => {
  uni.showModal({
    title: '关于我们',
    content: `${config.storeInfo.name}，专注美甲服务，提供多种款式和护理项目，欢迎预约体验~`,
    showCancel: false
  })
}
</script>

<style lang="scss" scoped>
@import '@/common/global.scss';
.container {
  padding: 20rpx;
  padding-bottom: 120rpx;
}
.user-info {
  display: flex;
  align-items: center;
  padding: 30rpx;
  margin-bottom: 20rpx;
  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }
  .nickname {
    font-size: 30rpx;
    font-weight: bold;
  }
}
.menu-list {
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 20rpx;
    border-bottom: 1rpx solid $border-color;
    &:last-child {
      border-bottom: none;
    }
    .menu-text {
      font-size: 28rpx;
      color: $text-main;
    }
    .arrow {
      color: $text-secondary;
    }
  }
}
</style>