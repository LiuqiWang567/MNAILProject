<template>
  <view class="container">
    <!-- 顶部个人信息卡片 -->
    <view class="user-card">
      <!-- 头像 -->
      <view class="avatar-box" @tap="changeAvatar">
        <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
        <text class="edit-tip">点击修改</text>
      </view>

      <!-- 用户名 -->
      <view class="item-row" @tap="editName">
        <text class="label">用户名</text>
        <text class="value">{{ userInfo.nickname }}</text>
      </view>

      <!-- 年龄 -->
      <view class="item-row">
        <text class="label">年龄</text>
        <text class="value">{{ userInfo.age }} 岁</text>
      </view>

      <!-- 等级 -->
      <view class="item-row">
        <text class="label">会员等级</text>
        <text class="level-tag" :class="`level-${userInfo.level}`">
          {{ userInfo.level }}级
        </text>
      </view>

      <!-- 手机号 -->
      <view class="item-row">
        <text class="label">手机号</text>
        <text class="value">{{ userInfo.phone }}</text>
      </view>
    </view>

 

    <!-- 底部按钮 -->
    <view class="btn-box">
      <button class="edit-btn" @tap="goEdit">修改个人资料</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: "/static/logo.png", // 你可以换成网络头像
        nickname: "张三",
        age: 26,
        level: 3,
        phone: "13800138000",
        balance: 1688.50
      }
    };
  },
  methods: {
    // 修改头像
    changeAvatar() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.userInfo.avatar = res.tempFilePaths[0];
        }
      });
    },
    // 修改名字
    editName() {
      uni.showModal({
        title: "修改用户名",
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            this.userInfo.nickname = res.content;
          }
        }
      });
    },
    // 去编辑页
    goEdit() {
      uni.navigateTo({
        url: "/pages/edit-info/edit-info"
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 个人信息卡片 */
.user-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
}

/* 头像 */
.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
}
.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4rpx solid #eee;
}
.edit-tip {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
}

/* 行项目 */
.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}
.item-row:last-child {
  border-bottom: none;
}
.label {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}
.value {
  font-size: 30rpx;
  color: #666;
}

/* 等级标签 */
.level-tag {
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  color: #fff;
}
.level-1 { background-color: #95a5a6; }
.level-2 { background-color: #3498db; }
.level-3 { background-color: #2ecc71; }
.level-4 { background-color: #f39c12; }
.level-5 { background-color: #e74c3c; }


/* 按钮 */
.btn-box {
  padding: 20rpx 0;
}
.edit-btn {
  background-color: #ff6b6b;
  color: #fff;
  border-radius: 50rpx;
  font-size: 32rpx;
}
</style>