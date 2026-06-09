<template>
  <view class="my-input-wrap">
    <input
      v-model="value"
      class="my-input"
      :placeholder="placeholder"
      :password="password"
      @input="onInput"
    />
  </view>
</template>

<script setup>
// 👉 必须加这一行！！！
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  password: Boolean
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() { return props.modelValue },
  set(v) { emit('update:modelValue', v) }
})

const onInput = (e) => {
  value.value = e.detail.value
}
</script>

<style lang="scss" scoped>
.my-input {
  height: 88rpx;
  font-size: 30rpx;
}
.my-input-wrap {
  background: #fff;
  border-radius: 10rpx;
  padding: 0 20rpx;
  margin-bottom: 20rpx;
}
</style>