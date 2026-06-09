<template>
  <view class="page">

    <!-- 顶部搜索 + 新增 -->
    <view class="top-bar">
      <input class="search-input" v-model="searchKey" placeholder="搜索姓名/手机号" />
      <button class="add-btn" @tap="addEmployee">+ 新增员工</button>
    </view>

    <!-- 员工列表 -->
    <scroll-view class="list" scroll-y>
      <view class="item" v-for="(item, index) in showList" :key="item.id">
        <view class="info">
          <view class="name">{{ item.name }}</view>
          <view class="role">{{ item.role }}</view>
          <view class="phone">{{ item.phone }}</view>
          <view class="skill">擅长：{{ item.skill }}</view>
        </view>
        <view class="btns">
          <button class="edit" @tap="editEmployee(item, index)">编辑</button>
          <button class="del" @tap="deleteEmployee(item.id, index)">删除</button>
        </view>
      </view>
    </scroll-view>

    <!-- 新增/编辑 弹窗 -->
    <view class="mask" v-if="showForm" @tap="showForm=false"></view>
    <view class="form-popup" v-if="showForm">
      <view class="title">{{ isEdit ? '编辑员工' : '新增员工' }}</view>

      <input v-model="form.name" placeholder="请输入员工姓名" />
      <input v-model="form.phone" placeholder="请输入手机号" />
      <input v-model="form.role" placeholder="身份：美甲师/美睫师/美容师/店长" />
      <input v-model="form.skill" placeholder="擅长项目：纯色/手绘/美睫/护肤等" />

      <view class="btns">
        <button @tap="saveEmployee">保存</button>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 员工数据
const employeeList = ref([
  { id: 1, name: '小美', phone: '13800138000', role: '美甲师', skill: '纯色、手绘、法式' },
  { id: 2, name: '小丽', phone: '13900139000', role: '美睫师', skill: '自然款、浓密款' },
  { id: 3, name: '张店长', phone: '13700137000', role: '店长', skill: '全店管理、技术指导' },
])

const searchKey = ref('')
const showForm = ref(false)
const isEdit = ref(false)
const editIndex = ref(-1)

const form = ref({
  id: null,
  name: '',
  phone: '',
  role: '',
  skill: ''
})

// 搜索过滤
const showList = computed(() => {
  let arr = [...employeeList.value]
  if (searchKey.value) {
    const kw = searchKey.value.toLowerCase()
    arr = arr.filter(i =>
      i.name.includes(kw) ||
      i.phone.includes(kw) ||
      i.role.includes(kw) ||
      i.skill.includes(kw)
    )
  }
  return arr
})

// 新增
const addEmployee = () => {
  isEdit.value = false
  form.value = { id: null, name: '', phone: '', role: '', skill: '' }
  showForm.value = true
}

// 编辑
const editEmployee = (item, index) => {
  isEdit.value = true
  editIndex.value = index
  form.value = { ...item }
  showForm.value = true
}

// 保存
const saveEmployee = () => {
  if (!form.value.name || !form.value.phone) {
    uni.showToast({ icon: 'none', title: '请填写完整信息' })
    return
  }
  if (isEdit.value) {
    employeeList.value[editIndex.value] = { ...form.value }
  } else {
    employeeList.value.unshift({
      ...form.value,
      id: Date.now()
    })
  }
  showForm.value = false
}

// 删除
const deleteEmployee = (id, index) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除该员工吗？',
    success: (res) => {
      if (res.confirm) {
        employeeList.value.splice(index, 1)
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

/* 顶部栏 */
.top-bar {
  display: flex;
  padding: 20rpx;
  gap: 16rpx;
  background: #fff;
}
.search-input {
  flex: 1;
  height: 70rpx;
  border-radius: 50rpx;
  background: #f5f5f5;
  padding: 0 24rpx;
  font-size: 26rpx;
}
.add-btn {
  background: #ff5a94;
  color: #fff;
  font-size: 24rpx;
  border-radius: 12rpx;
  padding: 0 20rpx;
}

/* 员工列表 */
.item {
  background: #fff;
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info {
  flex: 1;
}
.name {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}
.role {
  font-size: 24rpx;
  color: #ff5a94;
  margin-bottom: 6rpx;
}
.phone {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 6rpx;
}
.skill {
  font-size: 22rpx;
  color: #999;
}

/* 按钮 */
.btns {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.edit {
  background: #66b1ff;
  color: #fff;
  font-size: 22rpx;
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
}
.del {
  background: #fa8080;
  color: #fff;
  font-size: 22rpx;
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
}

/* 弹窗 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.form-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
input {
  border: 1rpx solid #eee;
  height: 80rpx;
  margin-bottom: 20rpx;
  padding: 0 20rpx;
  border-radius: 12rpx;
  font-size: 26rpx;
}
.btns {
  display: flex;
  justify-content: center;
  margin-top: 20rpx;
}
</style>