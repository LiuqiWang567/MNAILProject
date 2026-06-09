"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const activeIndex = common_vendor.ref(0);
    const store = store_index.useUserStore();
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
    ];
    const tabList = common_vendor.computed(() => store.userInfo.isAdmin ? staffTab : staffTab);
    const setActiveIndex = () => {
      const pages = getCurrentPages();
      const curr = pages[pages.length - 1];
      if (!curr)
        return;
      tabList.value.forEach((item, index) => {
        if (item.pagePath === curr.route) {
          activeIndex.value = index;
        }
      });
    };
    common_vendor.onMounted(() => {
      setActiveIndex();
    });
    common_vendor.index.onAppRoute(() => {
      setActiveIndex();
    });
    const switchTab = (item) => {
      common_vendor.index.reLaunch({
        url: "/" + item.pagePath
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabList.value, (item, index, i0) => {
          return {
            a: activeIndex.value === index ? item.activeIcon : item.icon,
            b: common_vendor.t(item.text),
            c: activeIndex.value === index ? 1 : "",
            d: index,
            e: common_vendor.o(($event) => switchTab(item), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-52454e90"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/custom-tabbar/index.js.map
