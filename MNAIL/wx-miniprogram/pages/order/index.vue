<template>
  <view class="container">
    <my-card>
      <text>这里写页面内容</text>
    </my-card>
  </view>
</template>

<script setup>
// 注意：onLoad 不用 import，直接写
onLoad(() => {
  console.log('页面加载成功')
})
</script>

<style lang="scss" scoped>
@import "/styles/theme.scss";
.container {
  padding: 20rpx;
}
</style>