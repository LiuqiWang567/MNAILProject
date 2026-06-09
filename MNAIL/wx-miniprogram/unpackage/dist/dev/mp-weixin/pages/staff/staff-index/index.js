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
    const goToOrderManage = () => {
      common_vendor.index.navigateTo({ url: "/pages/staff/staff-order/index" });
    };
    const goToWorksManage = () => {
      common_vendor.index.navigateTo({ url: "/pages/staff/staff-works/index" });
    };
    const goToTimeManage = () => {
    };
    const goToMember = () => {
      common_vendor.index.navigateTo({ url: "/pages/staff/staff-member/index" });
    };
    const goToManage = () => {
      common_vendor.index.navigateTo({ url: "/pages/staff/staff-manage/index" });
    };
    const store = store_index.useUserStore();
    store.userInfo;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goToOrderManage, "b7"),
        b: common_vendor.o(goToWorksManage, "47"),
        c: common_vendor.o(goToTimeManage, "f7"),
        d: common_vendor.o(goToManage, "21"),
        e: common_vendor.o(goToMember, "fc")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-014d55f9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/staff/staff-index/index.js.map
