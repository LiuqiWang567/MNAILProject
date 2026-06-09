<template>
  <view class="container">
    <!-- 筛选区域 -->
    <view class="filter-box">
      <!-- 日期筛选 原生picker 全平台兼容 -->
      <picker mode="date" :value="selectDate" @change="onDateChange">
        <view class="filter-item">
          <text class="label">预约日期</text>
          <text class="val">{{ selectDate || '全部日期' }}</text>
          <uni-icons type="arrowdown" size="20"></uni-icons>
        </view>
      </picker>

      <!-- 服务类型筛选 -->
      <view class="filter-item" @tap="showTypePopup = true">
        <text class="label">服务类型</text>
        <text class="val">{{ selectTypeName || '全部类型' }}</text>
        <uni-icons type="arrowdown" size="20"></uni-icons>
      </view>
    </view>

    <!-- 列表滚动区域 -->
    <scroll-view class="list-container" scroll-y="true">
      <view class="list-box">
        <view class="record-item" v-for="item in recordList" :key="item.id">
          <view class="item-top">
            <text class="type-tag">{{ item.serviceType }}</text>
            <text class="date">{{ item.createTime }}</text>
          </view>
          <view class="item-content">
            <view class="row">
              <text class="name">项目：{{ item.serviceName }}</text>
            </view>
            <view class="row">
              <text class="time">预约时段：{{ item.appointTime }}</text>
            </view>
            <view class="row">
              <text class="price">¥{{ item.price }}</text>
              <text class="status" :class="statusClass(item.status)">{{ item.statusText }}</text>
            </view>
          </view>
        </view>

        <!-- 空数据提示 -->
        <view class="empty" v-if="recordList.length === 0">
          <image src="/static/empty.png" class="empty-img"></image>
          <text class="empty-txt">暂无预约记录</text>
        </view>
      </view>
    </scroll-view>

    <!-- 服务类型弹窗 -->
    <uni-popup v-model="showTypePopup" position="bottom">
      <view class="popup-content">
        <view class="popup-title">选择服务类型</view>
        <view class="type-list">
          <view 
            class="type-item" 
            :class="{active: selectType === ''}"
            @tap="chooseType('', '全部类型')"
          >全部</view>
          <view 
            class="type-item" 
            :class="{active: selectType === '美甲'}"
            @tap="chooseType('美甲', '美甲')"
          >美甲</view>
          <view 
            class="type-item" 
            :class="{active: selectType === '纹眉'}"
            @tap="chooseType('纹眉', '纹眉')"
          >纹眉</view>
          <view 
            class="type-item" 
            :class="{active: selectType === '美睫'}"
            @tap="chooseType('美睫', '美睫')"
          >美睫</view>
          <view 
            class="type-item" 
            :class="{active: selectType === '脱毛'}"
            @tap="chooseType('脱毛', '脱毛')"
          >脱毛</view>
        </view>
        <view class="cancel-btn" @tap="showTypePopup = false">取消</view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectDate: '',
      selectType: '',
      selectTypeName: '',
      showTypePopup: false,
      // 原始数据，用于每次筛选回溯
      originalList: [
        {
          id: 1,
          serviceType: '美甲',
          serviceName: '纯色美甲+跳色',
          createTime: '2026-06-08',
          appointTime: '2026-06-10 14:00',
          price: 98,
          status: 1,
          statusText: '已完成'
        },
        {
          id: 2,
          serviceType: '美睫',
          serviceName: '自然款睫毛嫁接',
          createTime: '2026-06-09',
          appointTime: '2026-06-11 10:30',
          price: 168,
          status: 0,
          statusText: '待到店'
        },
        {
          id: 3,
          serviceType: '美睫',
          serviceName: '自然款睫毛嫁接',
          createTime: '2026-06-09',
          appointTime: '2026-06-11 10:30',
          price: 168,
          status: 0,
          statusText: '待到店'
        },
        {
          id: 4,
          serviceType: '美睫',
          serviceName: '自然款睫毛嫁接',
          createTime: '2026-06-09',
          appointTime: '2026-06-11 10:30',
          price: 168,
          status: 0,
          statusText: '待到店'
        },
        {
          id: 5,
          serviceType: '美睫',
          serviceName: '自然款睫毛嫁接',
          createTime: '2026-06-09',
          appointTime: '2026-06-11 10:30',
          price: 168,
          status: 0,
          statusText: '待到店'
        },
        {
          id: 6,
          serviceType: '脱毛',
          serviceName: '腋下单次脱毛',
          createTime: '2026-06-07',
          appointTime: '2026-06-09 16:00',
          price: 68,
          status: 2,
          statusText: '已取消'
        }
      ],
      // 页面展示列表
      recordList: []
    }
  },
  onShow() {
    this.getRecordList()
  },
  methods: {
    // 日期选择回调
    onDateChange(e) {
      this.selectDate = e.detail.value
      this.getRecordList()
    },
    // 选择服务类型
    chooseType(type, name) {
      this.selectType = type
      this.selectTypeName = name
      this.showTypePopup = false
      this.getRecordList()
    },
    // 状态样式匹配
    statusClass(status) {
      switch (status) {
        case 0: return 'wait'
        case 1: return 'finish'
        case 2: return 'cancel'
        default: return ''
      }
    },
    // 筛选核心逻辑
    getRecordList() {
      let list = [...this.originalList]
      // 日期筛选
      if (this.selectDate) {
        list = list.filter(item => item.createTime === this.selectDate)
      }
      // 类型筛选
      if (this.selectType) {
        list = list.filter(item => item.serviceType === this.selectType)
      }
      this.recordList = list
    }
  }
}
</script>

<style scoped>
/* 最外层布局 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f7f7;
}

/* 筛选栏固定顶部 */
.filter-box {
  display: flex;
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  margin: 20rpx;
  margin-bottom: 20rpx;
}
.filter-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filter-item:first-child {
  border-right: 1rpx solid #eee;
}
.label {
  font-size: 26rpx;
  color: #333;
  margin-right: 10rpx;
}
.val {
  font-size: 26rpx;
  color: #666;
  margin-right: 8rpx;
}

/* 滚动列表容器 */
.list-container {
  flex: 1;
  overflow: hidden;
  padding: 0 20rpx;
}
.list-box {
  padding-bottom: 40rpx;
}

/* 列表项样式 */
.record-item {
  background: #fff;
  border-radius: 12rpx;
  padding: 28rpx;
  margin-bottom: 20rpx;
}
.item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}
.type-tag {
  background: #fef0f0;
  color: #f56c6c;
  font-size: 24rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
}
.date {
  font-size: 24rpx;
  color: #999;
}
.row {
  display: flex;
  align-items: center;
  margin: 10rpx 0;
}
.name, .time {
  font-size: 28rpx;
  color: #333;
}
.price {
  font-size: 30rpx;
  color: #e64340;
  font-weight: bold;
  flex: 1;
}
.status {
  font-size: 26rpx;
}
.wait {
  color: #e6a23c;
}
.finish {
  color: #67c23a;
}
.cancel {
  color: #999;
}

/* 空数据 */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120rpx;
}
.empty-img {
  width: 160rpx;
  height: 160rpx;
}
.empty-txt {
  font-size: 26rpx;
  color: #999;
  margin-top: 20rpx;
}

/* 底部弹窗 */
.popup-content {
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;
  padding: 30rpx;
}
.popup-title {
  text-align: center;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 30rpx;
}
.type-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}
.type-item {
  width: calc(50% - 10rpx);
  text-align: center;
  line-height: 80rpx;
  font-size: 28rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
}
.type-item.active {
  background: #f56c6c;
  color: #fff;
  border-color: #f56c6c;
}
.cancel-btn {
  text-align: center;
  line-height: 80rpx;
  font-size: 30rpx;
  color: #666;
  margin-top: 30rpx;
  border-top: 1rpx solid #eee;
}
</style>