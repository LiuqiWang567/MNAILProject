<template>
	<view class="tabbar">
		<view v-for="(item, index) in tabList" :key="index" class="tabbar-item" @click="switchTab(item)">
			<image class="tabbar-icon" :src="activeIndex === index ? item.activeIcon : item.icon"></image>
			<text class="tabbar-text" :class="{ active: activeIndex === index }">{{item.text}}</text>
		</view>
	</view>
</template>

<script setup>
	import { useUserStore } from "/store/index.js"
	import { computed, ref, onMounted } from "vue"
	import config from '../../config/index.js'

	const activeIndex = ref(0)
	const store = useUserStore()

	// 员工tab（统一去掉开头 /）
	const staffTab = [
		{
			pagePath: "pages/staff/staff-index/index",
			text: "首页",
			icon: "//images/tabbar/tabbar-staff-index.png",
			activeIcon: "/static/images/tabbar/tabbar-staff-index-active.png"
		},
		{
			pagePath: "pages/staff/staff-order/index",
			text: "订单",
			icon: "/static/images/tabbar/tabbar-staff-order.png",
			activeIcon: "/static/images/tabbar/tabbar-staff-order-active.png"
		},
		{
			pagePath: "pages/staff/staff-my/index",
			text: "我的",
			icon: "/static/images/tabbar/tabbar-staff-my.png",
			activeIcon: "/static/images/tabbar/tabbar-staff-my-active.png"
		}
	]

	// 用户tab
	const userTab = [
		{
			pagePath: "pages/user/user-index/index",
			text: "首页",
			icon: "/static/images/tabbar/tabbar-staff-index.png",
			activeIcon: "/static/images/tabbar/tabbar-staff-index-active.png"
		},
		{
			pagePath: "pages/user/user-works/index",
			text: "预约",
			icon: "/static/images/tabbar/tabbar-staff-order.png",
			activeIcon: "/static/images/tabbar/tabbar-staff-order-active.png"
		},
		{
			pagePath: "pages/user/user-my/index",
			text: "我的",
			icon: "/static/images/tabbar/tabbar-staff-my.png",
			activeIcon: "/static/images/tabbar/tabbar-staff-my-active.png"
		}
	]

	//const tabList = computed(() => (store.userInfo.isAdmin ? staffTab : userTab))
const tabList = computed(() => (store.userInfo.isAdmin ? staffTab : staffTab))
	// 初始化 activeIndex
	const setActiveIndex = () => {
		const pages = getCurrentPages()
		const curr = pages[pages.length - 1]
		if (!curr) return
		tabList.value.forEach((item, index) => {
			if (item.pagePath === curr.route) {
				activeIndex.value = index
			}
		})
	}

	onMounted(() => {
		setActiveIndex()
	})

	// 路由切换更新索引
	uni.onAppRoute(() => {
		setActiveIndex()
	})

	// 跳转
	const switchTab = (item) => {
		uni.reLaunch({
			url: "/" + item.pagePath
		})
	}
</script>

<style lang="scss" scoped>
	@import '../../common/global.scss';

	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-top: 1rpx solid $border-color;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tabbar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 22rpx;
		color: $text-secondary;
	}

	.tabbar-icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 8rpx;
	}

	.tabbar-text.active {
		color: $primary;
	}
</style>