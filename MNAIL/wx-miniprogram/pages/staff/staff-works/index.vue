<template>
  <view class="staff-works-container">

    <!-- 左侧分类 -->
    <scroll-view class="category-side" scroll-y>
      <view
        class="tab-item"
        :class="{ active: activeCid === item.id }"
        v-for="item in categoryList"
        :key="item.id"
        @click="selectCategory(item.id)"
      >
        {{ item.name }}
      </view>
    </scroll-view>

    <!-- 右侧内容 -->
    <scroll-view class="content-side" scroll-y>
      <!-- 款式列表 -->
      <view class="works-list">
        <view class="work-item" v-for="(item, index) in showList" :key="index">
          <image class="pic" :src="item.url" mode="aspectFill"></image>
          <view class="tag" v-if="item.tag">{{ item.tag }}</view>
          <view class="name">{{ item.name }}</view>
          <view class="del-btn" @click="deleteWork(index)">×</view>
        </view>
      </view>
    </scroll-view>

    <!-- 右下角漂浮上传按钮 -->
    <view class="float-btn" @click="chooseImage">
      <text class="icon">+</text>
    </view>

    <!-- 上传弹窗 -->
    <view class="popup-mask" v-if="showPopup" @click="closePopup"></view>
    <view class="popup" v-if="showPopup">
      <view class="popup-title">{{ lang.staff.uploadWork }}</view>

      <view class="form-item">
        <text>款式分类</text>
        <picker mode="selector" :range="categoryNames" @change="onChangeCategory">
          <view class="picker-text">{{ categoryNames[uploadCid] }}</view>
        </picker>
      </view>

      <view class="form-item">
        <text>款式标签（热门/新品）</text>
        <input v-model="uploadTag" placeholder="例如：热门 / 新品" />
      </view>

      <view class="btns">
        <button class="cancel" @click="closePopup">{{ lang.common.cancel }}</button>
        <button class="confirm btn-primary" @click="doUpload">{{ lang.common.confirm }}</button>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import config from '@/config/index.js'
const lang = config.globalLang

// 分类
const categoryList = ref([
  { id: 1, name: lang.works.categorySolid },
  { id: 2, name: lang.works.categoryHand },
  { id: 3, name: lang.works.categoryFrench },
])
const categoryNames = computed(() => categoryList.value.map(i => i.name))

// 数据
const workList = ref([
  { url: '/static/images/works/1.jpg', name: '裸粉简约', cid: 1, tag: '热门' },
  { url: '/static/images/works/2.jpg', name: '手绘小花', cid: 2, tag: '新品' },
])

const activeCid = ref(1)
const showList = computed(() => {
  return workList.value.filter(i => i.cid === activeCid.value)
})
const selectCategory = (id) => activeCid.value = id

// 上传
const showPopup = ref(false)
const uploadCid = ref(0)
const uploadTag = ref('')
const tempFilePath = ref('')

const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      tempFilePath.value = res.tempFilePaths[0]
      uploadTag.value = ''
      uploadCid.value = 0
      showPopup.value = true
    }
  })
}
const onChangeCategory = (e) => {
  uploadCid.value = Number(e.detail.value) + 1
}
const doUpload = () => {
  if (!tempFilePath.value) return
  workList.value.unshift({
    url: tempFilePath.value,
    name: categoryNames.value[uploadCid.value - 1],
    cid: uploadCid.value,
    tag: uploadTag.value || ''
  })
  showPopup.value = false
  uni.showToast({ title: lang.staff.uploadSuccess, icon: 'success' })
}
const closePopup = () => showPopup.value = false

// 删除
const deleteWork = (index) => {
  uni.showModal({
    title: lang.common.deleteTip,
    success: (res) => {
      if (res.confirm) workList.value.splice(index, 1)
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/common/global.scss';

.staff-works-container {
  display: flex;
  height: 100vh;
  background: #f5f5f5;
}

/* ========== 左侧分类 ========== */
.category-side {
  width: 130rpx;
  background: #fff;
  border-right: 1rpx solid #eee;

  .tab-item {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 26rpx;
    color: #333;
    border-left: 6rpx solid transparent;
  }

  .tab-item.active {
    background: #fdf2f2;
    color: #ff5a94;
    border-left: 6rpx solid #ff5a94;
    font-weight: bold;
  }
}

/* ========== 右侧内容 ========== */
.content-side {
  flex: 1;
  padding: 20rpx;
}

.works-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .work-item {
    width: 48%;
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
    position: relative;

    .pic {
      width: 100%;
      height: 240rpx;
    }

    .tag {
      position: absolute;
      top: 16rpx;
      left: 16rpx;
      background: #ff5a94;
      color: #fff;
      padding: 4rpx 10rpx;
      border-radius: 8rpx;
      font-size: 22rpx;
    }

    .name {
      padding: 16rpx;
      font-size: 26rpx;
      text-align: center;
    }

    .del-btn {
      position: absolute;
      top: 10rpx;
      right: 10rpx;
      width: 44rpx;
      height: 44rpx;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30rpx;
    }
  }
}

/* ========== 漂浮按钮 ========== */
.float-btn {
  position: fixed;
  right: 30rpx;
  bottom: 30rpx;
  width: 88rpx;
  height: 88rpx;
  background: #ff5a94;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6rpx 15rpx rgba(255, 90, 148, 0.4);
  z-index: 10;

  .icon {
    font-size: 40rpx;
    color: #fff;
    font-weight: bold;
  }
}

/* ========== 弹窗 ========== */
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
}

.popup {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 40rpx 30rpx;
  z-index: 100;

  .popup-title {
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30rpx;
  }

  .form-item {
    margin-bottom: 30rpx;

    text {
      font-size: 28rpx;
      display: block;
      margin-bottom: 12rpx;
    }

    input,
    .picker-text {
      border: 1rpx solid #eee;
      height: 80rpx;
      border-radius: 12rpx;
      padding: 0 20rpx;
      font-size: 26rpx;
      display: flex;
      align-items: center;
    }
  }

  .btns {
    display: flex;
    justify-content: space-between;
    margin-top: 40rpx;

    button {
      width: 47%;
      border-radius: 12rpx;
    }

    .cancel {
      background: #f5f5f5;
    }
  }
}
</style>