"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_index = require("../../../store/index.js");
const config_index = require("../../../config/index.js");
if (!Math) {
  CustomTabbar();
}
const CustomTabbar = () => "../../../components/custom-tabbar/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const lang = config_index.config.globalLang;
    const store = store_index.useUserStore();
    store.userInfo;
    const goToInformation = () => {
      common_vendor.index.navigateTo({ url: "/pages/staff/staff-information/index" });
    };
    const goStoreInfo = () => {
      common_vendor.index.showModal({
        title: lang.staff.storeInfo,
        content: config_index.config.storeInfo.name + "\n地址：" + config_index.config.storeInfo.address + "\n电话：" + config_index.config.storeInfo.phone,
        showCancel: false
      });
    };
    const goResetPwd = () => {
      common_vendor.index.showToast({
        title: lang.staff.resetPwdTip,
        icon: "none"
      });
    };
    const goAbout = () => {
      common_vendor.index.showModal({
        title: lang.staff.about,
        content: "美甲店预约管理系统 v1.0",
        showCancel: false
      });
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: lang.staff.logoutTipTitle,
        content: lang.staff.logoutTip,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.reLaunch({
              url: "/pages/login/index"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(goToInformation, "f6"),
        c: common_vendor.t(common_vendor.unref(lang).staff.storeInfo),
        d: common_vendor.o(goStoreInfo, "c9"),
        e: common_vendor.t(common_vendor.unref(lang).staff.resetPwd),
        f: common_vendor.o(goResetPwd, "7d"),
        g: common_vendor.t(common_vendor.unref(lang).staff.about),
        h: common_vendor.o(goAbout, "17"),
        i: common_vendor.t(common_vendor.unref(lang).staff.logout),
        j: common_vendor.o(logout, "50")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ad5e70fc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/staff/staff-my/index.js.map
