<!-- pages/user/user-appoint/index.vue -->
<template>
  <view class="container">
    <view class="form">
      <view class="form-item">
        <text class="label">{{ lang?.appointment?.project || '预约项目' }}</text>
        <picker mode="selector" :range="projectList" @change="changeProject">
          <view class="picker-value">{{ formData.project || '请选择项目' }}</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">{{ lang?.appointment?.date || '选择日期' }}</text>
        <picker mode="date" @change="changeDate">
          <view class="picker-value">{{ formData.date || '请选择日期' }}</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">{{ lang?.appointment?.time || '选择时段' }}</text>
        <picker mode="selector" :range="timeList" @change="changeTime">
          <view class="picker-value">{{ formData.time || '请选择时段' }}</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">{{ lang?.appointment?.name || '联系人姓名' }}</text>
        <input v-model="formData.name" placeholder="请输入姓名" class="input"></input>
      </view>
      <view class="form-item">
        <text class="label">{{ lang?.appointment?.phone || '联系手机号' }}</text>
        <input v-model="formData.phone" placeholder="请输入手机号" class="input" type="number"></input>
      </view>
      <view class="form-item">
        <text class="label">{{ lang?.appointment?.remark || '备注' }}</text>
        <textarea v-model="formData.remark" placeholder="备注你的需求（如款式、人数）" class="textarea"></textarea>
      </view>
      <button class="btn submit-btn" @tap="submitAppointment">{{ lang?.appointment?.submit || '提交预约' }}</button>
    </view>
    <!-- 自定义 tabBar -->
    <custom-tabbar />
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import config from '@/config/index.js'
import CustomTabbar from '@/components/custom-tabbar/index.vue'

const lang = config.globalLang || {}

// 表单数据
const formData = reactive({
  project: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  remark: ''
})

// 项目和时段列表
const projectList = [
  '美甲款式',
  '手部护理',
  '足部护理',
  '美睫',
  '卸甲',
  '修补美甲',
  '画眉',
  '种眉毛',
  '脸部护理'
]
const timeList = ['10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '19:00-20:00', '20:00-21:00']

// 选择项目
const changeProject = (e) => {
  formData.project = projectList[e.detail.value]
}

// 选择日期
const changeDate = (e) => {
  formData.date = e.detail.value
}

// 选择时段
const changeTime = (e) => {
  formData.time = timeList[e.detail.value]
}

// 提交预约
const submitAppointment = () => {
  if (!formData.project || !formData.date || !formData.time || !formData.name || !formData.phone) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
    uni.showToast({ title: '手机号格式不正确', icon: 'none' })
    return
  }
  uni.showModal({
    title: '提示',
    content: lang.appointment?.success || '提交成功，我们会尽快与您联系！',
    showCancel: false,
    success: () => {
      // 清空表单
      formData.project = ''
      formData.date = ''
      formData.time = ''
      formData.name = ''
      formData.phone = ''
      formData.remark = ''
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/common/global.scss';
.container {
  padding-bottom: 120rpx;
  background: $gray-bg;
  min-height: 100vh;
}
</style>