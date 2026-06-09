<template>
  <view class="my-card">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import "/styles/theme.scss";

.my-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}
</style>