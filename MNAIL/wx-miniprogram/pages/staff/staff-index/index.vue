<!-- pages/staff/staff-index/index.vue -->
<template>
  <view class="container">
    <view class="card">
      <text class="title">员工后台</text>
      <view class="stat-list">
        <view class="stat-item">
          <text class="stat-num">0</text>
          <text class="stat-label">待确认预约</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">0</text>
          <text class="stat-label">今日预约</text>
        </view>
      </view>
    </view>
    <view class="menu-list card">
      <view class="menu-item" @tap="goToOrderManage">
        <text class="menu-text">预约管理</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item" @tap="goToWorksManage">
        <text class="menu-text">款式管理</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item" @tap="goToTimeManage">
        <text class="menu-text">时段管理</text>
        <text class="arrow">></text>
      </view>
	  <view class="menu-item" @tap="goToManage">
	    <text class="menu-text">员工管理</text>
	    <text class="arrow">></text>
	  </view>
	  <view class="menu-item" @tap="goToMember">
	    <text class="menu-text">会员管理</text>
	    <text class="arrow">></text>
	  </view>
    </view>
    <!-- 自定义 tabBar -->
    <custom-tabbar />
  </view>
</template>

<script setup>
import { useUserStore } from "/store/index.js"
import CustomTabbar from "/components/custom-tabbar/index.vue"
const goToOrderManage = () => {
  uni.navigateTo({ url: '/pages/staff/staff-order/index' })
}

const goToWorksManage = () => {
  uni.navigateTo({ url: '/pages/staff/staff-works/index' })
}

const goToTimeManage = () => {
 // uni.showToast({ title: '功能开发中', icon: 'none' })
}
const goToMember = () => {
 uni.navigateTo({ url: '/pages/staff/staff-member/index' })

}
const goToManage = () => {
 uni.navigateTo({ url: '/pages/staff/staff-manage/index' })

}
// 获取用户信息
const store = useUserStore()
const userInfo = store.userInfo
</script>

<style lang="scss" scoped>
@import '@/common/global.scss';
.container {
  padding: 20rpx;
}
.title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}
.stat-list {
  display: flex;
  justify-content: space-around;
  .stat-item {
    text-align: center;
    .stat-num {
      display: block;
      font-size: 40rpx;
      font-weight: bold;
      color: $primary;
    }
    .stat-label {
      font-size: 24rpx;
      color: $text-secondary;
    }
  }
}
.menu-list {
  margin-top: 20rpx;
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