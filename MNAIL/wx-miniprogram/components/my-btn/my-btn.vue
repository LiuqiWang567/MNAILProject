<template>
  <view class="my-btn" :class="type" @click="onClick">
    <slot />
  </view>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  }
})
const emit = defineEmits(['click'])
const onClick = () => emit('click')
</script>

<style lang="scss" scoped>
@import "/styles/theme.scss";

.my-btn {
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #fff;
}

.primary {
  background: $primary;
}

.gray {
  background: #ccc;
}

.warning {
  background: #ff6b35;
}
</style>