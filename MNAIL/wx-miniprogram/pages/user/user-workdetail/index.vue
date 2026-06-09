<template>
  <view class="detail-page">
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots circular>
      <swiper-item>
        <image :src="item.src" class="swiper-img" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息 -->
    <view class="info-box">
      <view class="name">{{ item.name }}</view>
      <view class="price">
        价格请咨询商家
      </view>
      <view class="tag">
        <text class="tag-text">{{ item.tag }}</text>
      </view>
    </view>

    <!-- 项目描述 -->
    <view class="desc-box">
      <view class="title">项目介绍</view>
      <view class="desc">
        专业美容服务，效果持久，安全舒适，欢迎到店体验～
      </view>
    </view>

    <!-- 底部预约按钮 -->
    <view class="bottom-bar">
      <button class="order-btn" @tap="goToOrder(item)">立即预约</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const item = ref({})

onLoad((options) => {
  // 接收列表传过来的作品信息
  item.value = JSON.parse(decodeURIComponent(options.item))
})
const goToOrder = (item) => {
  uni.navigateTo({
    url: "/pages/user/user-appoint/index?item=" + encodeURIComponent(JSON.stringify(item))
  })
}

</script>

<style scoped>
.detail-page {
  background: #f9f9f9;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

.swiper {
  width: 100%;
  height: 400rpx;
}
.swiper-img {
  width: 100%;
  height: 100%;
}

.info-box {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}
.name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}
.price {
  font-size: 32rpx;
  color: #ff5a94;
  margin-bottom: 20rpx;
}
.tag-text {
  background: #fef2f5;
  color: #ff5a94;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.desc-box {
  background: #fff;
  padding: 30rpx;
}
.title {
  font-size: 30rpx;
  font-weight: 500;
  margin-bottom: 20rpx;
}
.desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 20rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
}
.order-btn {
  background: #ff5a94;
  color: #fff;
  border-radius: 50rpx;
  font-size: 32rpx;
}
</style>