// 用户端 TabBar
export const userTabBar = {
  list: [
    { pagePath: "/pages/user/user-index/index", text: "首页" },
    { pagePath: "/pages/service/index", text: "服务" },
    { pagePath: "/pages/order/index", text: "订单" },
    { pagePath: "/pages/mine/index", text: "我的" },
  ],
};

// 员工端 TabBar
export const staffTabBar = {
  list: [
    { pagePath: "/pages/staff/staff-index/index", text: "工作台" },
    { pagePath: "/pages/order/index", text: "订单" },
    { pagePath: "/pages/service/index", text: "项目" },
    { pagePath: "/pages/mine/index", text: "我的" },
  ],
};

// 设置 TabBar
export function setTabBar(isStaff) {
  const tabBar = isStaff ? staffTabBar : userTabBar;
  uni.setTabBarItem({
    index: 0,
    text: tabBar.list[0].text,
  });
  uni.setTabBarItem({
    index: 1,
    text: tabBar.list[1].text,
  });
  uni.setTabBarItem({
    index: 2,
    text: tabBar.list[2].text,
  });
  uni.setTabBarItem({
    index: 3,
    text: tabBar.list[3].text,
  });
}