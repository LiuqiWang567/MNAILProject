"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const config_index = require("../../../config/index.js");
if (!Math) {
  CustomTabbar();
}
const CustomTabbar = () => "../../../components/custom-tabbar/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const lang = config_index.config.globalLang;
    const goToInformation = () => {
      common_vendor.index.navigateTo({ url: "/pages/user/user-information/index" });
    };
    const goToMyAppointment = () => {
      common_vendor.index.navigateTo({ url: "/pages/user/user-appointrecord/index" });
    };
    const goToMyCollection = () => {
      common_vendor.index.showToast({ title: "收藏功能开发中", icon: "none" });
    };
    const showStoreNotice = () => {
      common_vendor.index.showModal({
        title: "门店须知",
        content: "1. 请提前预约，到店尽量准时；2. 临时改期请提前1小时联系；3. 美甲款式以门店实拍为准。",
        showCancel: false
      });
    };
    const showAboutUs = () => {
      common_vendor.index.showModal({
        title: "关于我们",
        content: `${config_index.config.storeInfo.name}，专注美甲服务，提供多种款式和护理项目，欢迎预约体验~`,
        showCancel: false
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(goToInformation, "8f"),
        c: common_vendor.t(common_vendor.unref(lang).mine.myAppointment),
        d: common_vendor.o(goToMyAppointment, "45"),
        e: common_vendor.t(common_vendor.unref(lang).mine.myCollection),
        f: common_vendor.o(goToMyCollection, "25"),
        g: common_vendor.t(common_vendor.unref(lang).mine.storeNotice),
        h: common_vendor.o(showStoreNotice, "ea"),
        i: common_vendor.t(common_vendor.unref(lang).mine.aboutUs),
        j: common_vendor.o(showAboutUs, "b3")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd00bf1e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/user-my/index.js.map
