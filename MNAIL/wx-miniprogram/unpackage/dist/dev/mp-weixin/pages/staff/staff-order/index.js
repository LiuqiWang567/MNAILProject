"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_index = require("../../../store/index.js");
if (!Math) {
  CustomTabbar();
}
const CustomTabbar = () => "../../../components/custom-tabbar/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = store_index.useUserStore();
    store.userInfo;
    const activeTab = common_vendor.ref(0);
    const tabList = common_vendor.ref([
      { id: 0, name: "全部" },
      { id: 1, name: "待确认" },
      { id: 2, name: "已确认" },
      { id: 3, name: "已完成" }
    ]);
    const orderList = common_vendor.ref([
      { project: "美甲款式", name: "张三", phone: "13800138000", date: "2026-05-30", time: "14:00-15:00", status: "待确认", remark: "想要法式款" },
      { project: "手部护理", name: "李四", phone: "13900139000", date: "2026-05-30", time: "16:00-17:00", status: "已确认", remark: "" }
    ]);
    const changeTab = (index) => {
      activeTab.value = index;
    };
    const filteredOrders = common_vendor.computed(() => {
      if (activeTab.value === 0)
        return orderList.value;
      const statusMap = ["", "待确认", "已确认", "已完成"];
      return orderList.value.filter((item) => item.status === statusMap[activeTab.value]);
    });
    const confirmOrder = (index) => {
      orderList.value[index].status = "已确认";
      common_vendor.index.showToast({ title: "已确认预约", icon: "success" });
    };
    const cancelOrder = (index) => {
      orderList.value[index].status = "已取消";
      common_vendor.index.showToast({ title: "已取消预约", icon: "success" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: activeTab.value === index ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => changeTab(index), index)
          };
        }),
        b: common_vendor.f(filteredOrders.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.project),
            b: common_vendor.t(item.status),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.phone),
            e: common_vendor.t(item.date),
            f: common_vendor.t(item.time),
            g: common_vendor.t(item.remark || "无"),
            h: item.status === "待确认"
          }, item.status === "待确认" ? {
            i: common_vendor.o(($event) => confirmOrder(index), index)
          } : {}, {
            j: item.status === "待确认"
          }, item.status === "待确认" ? {
            k: common_vendor.o(($event) => cancelOrder(index), index)
          } : {}, {
            l: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-84938ea6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/staff/staff-order/index.js.map
