<template>
  <view class="page">

    <!-- 顶部搜索 + 筛选 + 新增 -->
    <view class="top-bar">
      <input class="search-input" v-model="searchKey" placeholder="搜索会员姓名" />
      <view class="sort-btn" @tap="openSort">
        <text>排序</text>
      </view>
      <button class="add-btn" @tap="addMember">+ 新增</button>
    </view>

    <!-- 会员列表 -->
    <scroll-view class="list" scroll-y>
      <view class="item" v-for="item in showList" :key="item.id" @tap="openDetail(item)">
        <view class="name">{{ item.name }}</view>
        <view class="level">{{ item.level }}</view>
        <view class="balance">¥{{ item.balance }}</view>
      </view>
    </scroll-view>

    <!-- 会员详情弹窗 -->
    <view class="mask" v-if="showDetail" @tap="showDetail=false"></view>
    <view class="detail-popup" v-if="showDetail">
      <view class="title">会员详情</view>
      <view class="row"><text>姓名：</text>{{ currentMember.name }}</view>
      <view class="row"><text>电话：</text>{{ currentMember.phone }}</view>
      <view class="row"><text>等级：</text>{{ currentMember.level }}</view>
      <view class="row"><text>余额：</text>¥{{ currentMember.balance }}</view>
      <view class="row"><text>生日：</text>{{ currentMember.birthday || '未设置' }}</view>
      <view class="row"><text>注册：</text>{{ currentMember.createTime }}</view>
      <view class="row"><text>备注：</text>{{ currentMember.remark || '无' }}</view>
      <view class="btns">
        <button @tap="editMember">编辑/充值/扣款</button>
        <button @tap="showDetail=false">关闭</button>
      </view>
    </view>

    <!-- 新增/编辑/充值/扣款 弹窗 -->
    <view class="mask" v-if="showForm" @tap="showForm=false"></view>
    <view class="form-popup" v-if="showForm">
      <view class="title">{{ isEdit ? '编辑会员' : '新增会员' }}</view>

      <input v-model="form.name" placeholder="请输入姓名" />
      <input v-model="form.phone" placeholder="请输入手机号" />
      <input v-model="form.birthday" placeholder="生日：2000-01-01" />
	   <input v-model="form.balance" />
      <picker mode="selector" :range="levelList" @change="onLevelChange">
        <view class="picker">{{ levelList[form.levelId] }}</view>
      </picker>
      <input v-model="form.remark" placeholder="备注信息" />

      <!-- 充值 + 扣款按钮（仅编辑时显示） -->
      <view class="money-btns" v-if="isEdit">
        <button class="green" @tap="recharge">充值</button>
        <button class="red" @tap="consume">扣款</button>
      </view>

      <view class="btns">
        <button @tap="saveMember">保存</button>
      </view>
    </view>

    <!-- 排序弹窗 -->
    <view class="mask" v-if="showSort" @tap="showSort=false"></view>
    <view class="sort-popup" v-if="showSort">
      <view class="s-item" @tap="sortByBalance">按余额从高到低</view>
      <view class="s-item" @tap="sortByTime">按注册时间最新</view>
    </view>

  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 会员数据
const memberList = ref([
  { id: 1, name: '李女士', phone: '13800138000', level: 'VIP', levelId: 1, balance: 520, birthday: '1995-10-05', createTime: '2025-05-01', remark: '老顾客' },
  { id: 2, name: '张小姐', phone: '13900139000', level: '钻石', levelId: 2, balance: 1280, birthday: '1998-02-12', createTime: '2025-05-03', remark: '喜欢美甲' },
  { id: 3, name: '王姐', phone: '13700137000', level: '普通', levelId: 0, balance: 320, birthday: '1990-08-20', createTime: '2025-06-01', remark: '' },
])

const levelList = ['普通', 'VIP', '钻石']
const searchKey = ref('')
const currentMember = ref(null)
const showDetail = ref(false)
const showForm = ref(false)
const isEdit = ref(false)
const showSort = ref(false)

const form = ref({
  id: null, name: '', phone: '', levelId: 0, birthday: '', remark: '', balance: 0
})

// 搜索
const showList = computed(() => {
  let arr = [...memberList.value]
  if (searchKey.value) {
    arr = arr.filter(i => i.name.includes(searchKey.value))
  }
  return arr
})

// 打开详情
const openDetail = (item) => {
  currentMember.value = item
  showDetail.value = true
}

// 新增
const addMember = () => {
  isEdit.value = false
  form.value = { id: null, name: '', phone: '', levelId: 0, birthday: '', remark: '', balance: 0 }
  showForm.value = true
}

// 编辑
const editMember = () => {
  isEdit.value = true
  form.value = { ...currentMember.value }
  showDetail.value = false
  showForm.value = true
}

// 保存
const saveMember = () => {
  if (!form.value.name || !form.value.phone) {
    uni.showToast({ icon: 'none', title: '请填写完整信息' })
    return
  }
  if (isEdit.value) {
    const idx = memberList.value.findIndex(i => i.id === form.value.id)
    memberList.value[idx] = { ...form.value }
    currentMember.value = form.value
  } else {
    memberList.value.unshift({
      ...form.value,
      id: Date.now(),
      createTime: new Date().toLocaleString().substr(0, 10)
    })
  }
  showForm.value = false
}

// 排序
const sortByBalance = () => {
  memberList.value.sort((a, b) => b.balance - a.balance)
  showSort.value = false
}
const sortByTime = () => {
  memberList.value.sort((a, b) => b.createTime.localeCompare(a.createTime))
  showSort.value = false
}
const openSort = () => showSort.value = true
const onLevelChange = (e) => form.value.levelId = Number(e.detail.value)

// ========== 充值 / 扣款（放在编辑弹窗里）==========
const recharge = () => {
  uni.showModal({
    title: '充值',
    editable: true,
    success: (res) => {
      if (res.confirm && res.content) {
        form.value.balance = Number(form.value.balance) + Number(res.content)
      }
    }
  })
}
const consume = () => {
  uni.showModal({
    title: '消费扣款',
    editable: true,
    success: (res) => {
      if (res.confirm && res.content) {
        const val = Number(res.content)
        if (val > form.value.balance) {
          uni.showToast({ title: '余额不足', icon: 'none' })
          return
        }
        form.value.balance -= val
      }
    }
  })
}
</script>

<style scoped>
.page {
  background: #f7f7f7;
  min-height: 100vh;
}

.top-bar {
  display: flex;
  padding: 20rpx;
  gap: 10rpx;
  background: #fff;
}
.search-input {
  flex: 1;
  height: 70rpx;
  border-radius: 50rpx;
  background: #f5f5f5;
  padding: 0 20rpx;
}
.sort-btn {
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  font-size: 26rpx;
}
.add-btn {
  background: #ff5a94;
  color: #fff;
  font-size: 24rpx;
  border-radius: 10rpx;
}

/* 会员列表 */
.item {
  background: #fff;
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  font-size: 30rpx;
  font-weight: bold;
}
.level {
  background: #ff5a94;
  color: #fff;
  padding: 6rpx 12rpx;
  border-radius: 30rpx;
  font-size: 22rpx;
}
.balance {
  color: #ff5a94;
  font-size: 30rpx;
  font-weight: bold;
}

/* 弹窗 */
.mask {
  position: fixed; top:0;left:0;right:0;bottom:0;
  background: rgba(0,0,0,0.5);
  z-index: 99;
}
.detail-popup,
.form-popup,
.sort-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  width: 80%;
  z-index: 100;
}
.title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}
.row {
  font-size: 28rpx;
  margin-bottom: 20rpx;
}
input, .picker {
  border: 1rpx solid #eee;
  height: 80rpx;
  margin-bottom: 20rpx;
  padding: 0 20rpx;
  border-radius: 12rpx;
}

/* 充值扣款按钮 */
.money-btns {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}
.money-btns button {
  flex: 1;
  color: #fff;
  border-radius: 12rpx;
}
.green {
  background: #00b42a;
}
.red {
  background: #ff5a94;
}

.btns {
  display: flex;
  justify-content: center;
  gap: 20rpx;
  margin-top: 20rpx;
}
.s-item {
  padding: 20rpx;
  text-align: center;
  font-size: 28rpx;
}
</style>