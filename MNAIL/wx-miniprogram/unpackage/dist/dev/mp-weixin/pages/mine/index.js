"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userStore = store_index.useUserStore();
    const logout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            userStore.logout();
            common_vendor.index.reLaunch({
              url: "/pages/login/index"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(userStore).userInfo.username),
        b: common_vendor.t(common_vendor.unref(userStore).userInfo.isAdmin ? "管理员" : "普通员工"),
        c: common_vendor.n(common_vendor.unref(userStore).userInfo.isAdmin ? "admin-tag" : "staff-tag"),
        d: common_vendor.o(logout, "a8")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-569e925a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/index.js.map
