<template>
  <view class="container">
    <my-card>
      <text>服务项目页面</text>
    </my-card>
  </view>
</template>

<script setup>
// 注意：onLoad 是 uni-app 自带的，不用 import
onLoad(() => {
  console.log('服务项目页面加载成功')
})
</script>

<style lang="scss" scoped>
@import "/styles/theme.scss";
.container {
  padding: 20rpx;
}
</style>