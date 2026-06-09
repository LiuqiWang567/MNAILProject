<template>
  <view class="container">
     <!-- 1. 顶部轮播图 -->
        <swiper class="banner" indicator-dots circular autoplay>
          <swiper-item v-for="(item, index) in bannerList" :key="index">
            <image class="banner-img" :src="item.src" mode="widthFix"></image>
          </swiper-item>
        </swiper>
	 <!-- 2. 快捷功能入口 -->
	    <view class="quick-entry card">
	      <view class="entry-item" @tap="goToWorks">
	        <image class="entry-icon" src="/static/images/icon/works.png"></image>
	        <text class="entry-text">{{lang.works.title}}</text>
	      </view>
	      <view class="entry-item" @tap="goToAppointment">
	        <image class="entry-icon" src="/static/images/icon/appointment.png"></image>
	        <text class="entry-text">{{lang.appointment.title}}</text>
	      </view>
	      <view class="entry-item" @tap="showStoreAddress">
	        <image class="entry-icon" src="/static/images/icon/address.png"></image>
	        <text class="entry-text">{{lang.home.address}}</text>
	      </view>
	      <view class="entry-item" @tap="callStore">
	        <image class="entry-icon" src="/static/images/icon/phone.png"></image>
	        <text class="entry-text">{{lang.home.storeInfo}}</text>
	      </view>
	    </view>
	
	    <!-- 3. 今日主推 -->
	    <view class="hot-section">
	      <view class="section-title">{{lang.home.hotStyle}}</view>
	      <scroll-view class="hot-list" scroll-x>
	        <view class="hot-item" v-for="(item, index) in hotWorks" :key="index">
	          <image class="hot-img" :src="item.src" mode="widthFix"></image>
	          <text class="hot-name">{{item.name}}</text>
	        </view>
	      </scroll-view>
	    </view>
	
	    <!-- 4. 门店简介 -->
	    <view class="store-info card">
	      <view class="info-item">
	        <text class="info-label">{{lang.home.businessHours}}：</text>
	        <text class="info-value">{{storeInfo.businessHours}}</text>
	      </view>
	      <view class="info-item">
	        <text class="info-label">{{lang.home.address}}：</text>
	        <text class="info-value">{{storeInfo.address}}</text>
	      </view>
	    </view>
	
	 <!-- 自定义 tabBar -->
	    <custom-tabbar />
  </view>
</template>

<script setup>
import CustomTabbar from '/components/custom-tabbar/index.vue'
import { ref } from 'vue'
import config from '/config/index.js'
const lang = config.globalLang
const storeInfo = config.storeInfo
// 轮播图数据
const bannerList = ref([
  { src: '/static/images/banner/banner1.png' },
  { src: '/static/images/banner/banner2.png' },
  { src: '/static/images/banner/banner3.png' }
])
// 今日主推款式
const hotWorks = ref([
  { src: '/static/images/works/hot1.png', name: '温柔裸粉款' },
  { src: '/static/images/works/hot2.png', name: '法式白边款' },
  { src: '/static/images/works/hot3.png', name: '手绘小清新款' }
])

// 跳转款式页
const goToWorks = () => {
  uni.navigateTo({ url: '/pages/user/user-works/index' })
  
}

// 跳转预约页
const goToAppointment = () => {
  //uni.switchTab({ url: '/pages/user/user-appoint/index' })
  uni.navigateTo({ url: '/pages/user/user-appoint/index' })
  
}

// 显示门店地址
const showStoreAddress = () => {
  uni.openLocation({
    latitude: 31.23,
    longitude: 121.5,
    name: storeInfo.name,
    address: storeInfo.address
  })
}

// 一键拨打电话
const callStore = () => {
  uni.makePhoneCall({
    phoneNumber: storeInfo.phone
  })
}
</script>

<style lang="scss" scoped>
@import '@/common/global.scss';
.container {
  padding-bottom: 120rpx !important; /* 给底部导航留空间 */
}
.banner {
  width: 100%;
  height: 300rpx;
  .banner-img {
    width: 100%;
    height: 100%;
  }
}
.quick-entry {
  display: flex;
  justify-content: space-around;
  padding: 20rpx 0;
  .entry-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .entry-icon {
      width: 60rpx;
      height: 60rpx;
      margin-bottom: 10rpx;
    }
    .entry-text {
      font-size: 24rpx;
      color: $text-secondary;
    }
  }
}
.hot-section {
  margin: 20rpx;
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
  .hot-list {
    white-space: nowrap;
    .hot-item {
      display: inline-block;
      width: 200rpx;
      margin-right: 20rpx;
      .hot-img {
        width: 200rpx;
        height: 200rpx;
        border-radius: 12rpx;
      }
      .hot-name {
        display: block;
        font-size: 24rpx;
        text-align: center;
        margin-top: 8rpx;
        color: $text-secondary;
      }
    }
  }
}
.store-info {
  margin: 20rpx;
  .info-item {
    margin-bottom: 16rpx;
    .info-label {
      color: $text-secondary;
      font-size: 26rpx;
    }
    .info-value {
      color: $text-main;
      font-size: 26rpx;
    }
  }
}
</style>