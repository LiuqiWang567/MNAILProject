<!-- pages/staff/staff-order/index.vue -->
<template>
  <view class="container">
    <view class="tab-bar">
      <text class="tab-item" :class="{ active: activeTab === index }" v-for="(item, index) in tabList" :key="index" @tap="changeTab(index)">
        {{item.name}}
      </text>
    </view>
    <view class="order-list">
      <view class="order-item" v-for="(item, index) in filteredOrders" :key="index">
        <view class="order-header">
          <text class="order-project">{{item.project}}</text>
          <text class="order-status">{{item.status}}</text>
        </view>
        <view class="order-info">
          <text>姓名：{{item.name}}</text>
          <text>电话：{{item.phone}}</text>
          <text>时间：{{item.date}} {{item.time}}</text>
          <text>备注：{{item.remark || '无'}}</text>
        </view>
        <view class="order-action">
          <button class="btn-small" v-if="item.status === '待确认'" @tap="confirmOrder(index)">确认预约</button>
          <button class="btn-small cancel" v-if="item.status === '待确认'" @tap="cancelOrder(index)">取消预约</button>
        </view>
      </view>
    </view>
    <custom-tabbar />
  </view>
</template>

<script setup>
import { useUserStore } from "/store/index.js"
import CustomTabbar from "/components/custom-tabbar/index.vue"
import { ref, computed } from 'vue'

// 获取用户信息
const store = useUserStore()
const userInfo = store.userInfo
const activeTab = ref(0)
const tabList = ref([
  { id: 0, name: '全部' },
  { id: 1, name: '待确认' },
  { id: 2, name: '已确认' },
  { id: 3, name: '已完成' }
])

// 模拟预约数据，后续对接云开发
const orderList = ref([
  { project: '美甲款式', name: '张三', phone: '13800138000', date: '2026-05-30', time: '14:00-15:00', status: '待确认', remark: '想要法式款' },
  { project: '手部护理', name: '李四', phone: '13900139000', date: '2026-05-30', time: '16:00-17:00', status: '已确认', remark: '' }
])

const changeTab = (index) => {
  activeTab.value = index
}

const filteredOrders = computed(() => {
  if (activeTab.value === 0) return orderList.value
  const statusMap = ['', '待确认', '已确认', '已完成']
  return orderList.value.filter(item => item.status === statusMap[activeTab.value])
})

const confirmOrder = (index) => {
  orderList.value[index].status = '已确认'
  uni.showToast({ title: '已确认预约', icon: 'success' })
}

const cancelOrder = (index) => {
  orderList.value[index].status = '已取消'
  uni.showToast({ title: '已取消预约', icon: 'success' })
}
</script>

<style lang="scss" scoped>
@import '@/common/global.scss';
.container {
  padding: 20rpx;
}
.tab-bar {
  display: flex;
  background: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  .tab-item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    font-size: 26rpx;
    &.active {
      color: $primary;
      font-weight: bold;
    }
  }
}
.order-list {
  .order-item {
    background: #fff;
    border-radius: 12rpx;
    padding: 24rpx;
    margin-bottom: 20rpx;
    .order-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16rpx;
      .order-project {
        font-size: 28rpx;
        font-weight: bold;
      }
      .order-status {
        font-size: 24rpx;
        color: $primary;
      }
    }
    .order-info {
      font-size: 24rpx;
      color: $text-secondary;
      line-height: 1.6;
    }
    .order-action {
      margin-top: 20rpx;
      display: flex;
      justify-content: flex-end;
      .btn-small {
        padding: 12rpx 24rpx;
        font-size: 24rpx;
        border-radius: 16rpx;
        margin-left: 16rpx;
        &.cancel {
          background: #fff;
          border: 1rpx solid $border-color;
          color: $text-secondary;
        }
      }
    }
  }
}
</style>
