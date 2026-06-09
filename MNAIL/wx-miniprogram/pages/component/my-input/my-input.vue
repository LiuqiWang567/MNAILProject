<template>
  <view class="my-input">
    <input
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :password="password"
    />
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  password: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const onInput = (e) => {
  value.value = e.detail.value
}
</script>

<style scoped>
.my-input {
  border: 1px solid #eee;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}
input {
  font-size: 30rpx;
}
</style>