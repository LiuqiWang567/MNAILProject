<template>
  <view class="container">
    <view class="title">美甲店系统</view>

    <my-input v-model="username" placeholder="请输入账号" />
    <my-input v-model="password" placeholder="请输入密码" password />

<my-btn :loading="loading" @click="handleLogin">登录</my-btn>  </view>
</template>

<script setup>
import { ref } from "vue"
import { login as apiLogin } from '/utils/api/user.js'
import { useUserStore } from "/store/index.js"
const loading = ref(false) 

const username = ref("")
const password = ref("")
const isAdmin=ref("")

const store = useUserStore()

const handleLogin = async () => {
		username.value="wangliuqi"
		password.value="666666"
	 uni.reLaunch({ url: "/pages/staff/staff-index/index" })
}
// const handleLogin = async () => {
// 	username.value="wangliuqi"
// 	password.value="666666"
// 	 // 简单判空
// 	  if (!username.value || !password.value) {
// 	    uni.showToast({ title: '请输入账号密码', icon: 'none' })
// 	    return
// 	  }
	
// 	  loading.value = true
// 	  uni.showLoading({ title: '登录中...', mask: true })
//   try {
   

//     const res = await apiLogin(username.value, password.value)
//     console.log(res)
// 	 const userInfo = {
// 	      username: res.username,
// 	      isAdmin: res.isAdmin
// 	    }
// 	const token=res.token
// 	store.setToken(res.token)
//    store.setUserInfo(userInfo)
	
//     if (userInfo.isAdmin) {
//       console.log("进入员工主页面")
//       uni.reLaunch({ url: "/pages/staff/staff-index/index" })
//     } else {
//       console.log("进入用户主页面")
//       uni.reLaunch({ url: "/pages/user/user-index/index" })
//     }
//   } catch (err) {
//     console.error("登录失败：", err)
//     uni.showToast({ title: "登录出错", icon: "none" })
//   }
// }
</script>

<style lang="scss" scoped>
@import "/styles/theme.scss";
.container {
  padding: 100rpx 40rpx;
  height: 100vh;
  background: $gray;
}
.title {
  font-size: 48rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60rpx;
}
</style>