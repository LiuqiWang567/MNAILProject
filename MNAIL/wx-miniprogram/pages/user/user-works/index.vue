<template>
  <view class="container">
    <!-- 左侧固定分类栏 -->
    <scroll-view class="category-side" scroll-y>
      <view 
        class="category-item" 
        :class="{ active: activeCategory === item.id }"
        v-for="item in categoryList" 
        :key="item.id"
        @tap="changeCategory(item.id)"
      >
        {{ item.name }}
      </view>
    </scroll-view>

    <!-- 右侧内容区域 -->
    <scroll-view class="content-side" scroll-y>
      <view class="works-list">
        <view 
          class="works-item" 
          v-for="(item, index) in filteredWorks" 
          :key="index" 
         @tap="goToDetail(item)"
        >
          <image class="works-img" :src="item.src" mode="aspectFill"></image>
          <view class="works-info">
            <text class="works-name">{{ item.name }}</text>
            <text class="works-tag">{{ item.tag }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
	<custom-tabbar />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import CustomTabbar from '/components/custom-tabbar/index.vue'

const activeCategory = ref(0)

// 丰富后的分类：全部 / 美甲 / 美睫 / 护肤 / 纹眉 / 脱毛
const categoryList = ref([
  { id: 0, name: '全部' },
  { id: 1, name: '美甲' },
  { id: 2, name: '美睫' },
  { id: 3, name: '护肤' },
  { id: 4, name: '纹眉' },
  { id: 5, name: '脱毛' }
])

// 作品数据，对应不同分类
const worksList = ref([
  // 美甲
  { src: '/static/images/works/1.jpg', name: '温柔裸粉美甲', tag: '热门', category: 1 },
  { src: '/static/images/works/2.jpg', name: '手绘小花美甲', tag: '新品', category: 1 },
  { src: '/static/images/works/3.jpg', name: '法式白边美甲', tag: '爆款', category: 1 },
  // 美睫
  { src: '/static/images/works/1.jpg', name: '自然款美睫', tag: '推荐', category: 2 },
  { src: '/static/images/works/2.jpg', name: '浓密款美睫', tag: '热销', category: 2 },
  // 护肤
  { src: '/static/images/works/3.jpg', name: '深层补水护理', tag: '舒缓', category: 3 },
  { src: '/static/images/works/4.jpg', name: '净肤祛痘护理', tag: '口碑', category: 3 },
  // 纹眉
  { src: '/static/images/works/1.jpg', name: '野生眉', tag: '气质', category: 4 },
  { src: '/static/images/works/2.jpg', name: '雾面眉', tag: '自然', category: 4 },
  // 脱毛
  { src: '/static/images/works/3.jpg', name: '腋下脱毛', tag: '平价', category: 5 },
  { src: '/static/images/works/4.jpg', name: '四肢脱毛', tag: '套餐', category: 5 }
])

// 切换分类
const changeCategory = (id) => {
  activeCategory.value = id
}

// 筛选作品
const filteredWorks = computed(() => {
  if (activeCategory.value === 0) return worksList.value
  return worksList.value.filter(item => item.category === activeCategory.value)
})

// 跳转到详情页
const goToDetail = (item) => {
  uni.navigateTo({
    url: "/pages/user/user-workdetail/index?item=" + encodeURIComponent(JSON.stringify(item))
  })
}

// 图片预览
const previewImage = (url) => {
  uni.previewImage({
    urls: [url]
  })
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  background: #f5f5f5;
}

/* 左侧分类栏 */
.category-side {
  width: 120rpx;
  background: #fff;
  border-right: 1rpx solid #eee;

  .category-item {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 26rpx;
    color: #333;
    border-left: 6rpx solid transparent;
  }

  .category-item.active {
    background: #fdf2f2;
    color: #ff5a94;
    border-left: 6rpx solid #ff5a94;
    font-weight: bold;
  }
}

/* 右侧内容区 */
.content-side {
  flex: 1;
  padding: 20rpx;
}

.works-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .works-item {
    width: 48%;
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
  }

  .works-img {
    width: 100%;
    height: 240rpx;
  }

  .works-info {
    padding: 20rpx;
  }

  .works-name {
    font-size: 26rpx;
    color: #333;
    display: block;
    margin-bottom: 10rpx;
  }

  .works-tag {
    font-size: 22rpx;
    color: #ff5a94;
    border: 1rpx solid #ff5a94;
    padding: 4rpx 10rpx;
    border-radius: 10rpx;
  }
}
</style>