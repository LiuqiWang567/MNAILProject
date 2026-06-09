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
    const storeInfo = config_index.config.storeInfo;
    const bannerList = common_vendor.ref([
      { src: "/static/images/banner/banner1.png" },
      { src: "/static/images/banner/banner2.png" },
      { src: "/static/images/banner/banner3.png" }
    ]);
    const hotWorks = common_vendor.ref([
      { src: "/static/images/works/hot1.png", name: "温柔裸粉款" },
      { src: "/static/images/works/hot2.png", name: "法式白边款" },
      { src: "/static/images/works/hot3.png", name: "手绘小清新款" }
    ]);
    const goToWorks = () => {
      common_vendor.index.navigateTo({ url: "/pages/user/user-works/index" });
    };
    const goToAppointment = () => {
      common_vendor.index.navigateTo({ url: "/pages/user/user-appoint/index" });
    };
    const showStoreAddress = () => {
      common_vendor.index.openLocation({
        latitude: 31.23,
        longitude: 121.5,
        name: storeInfo.name,
        address: storeInfo.address
      });
    };
    const callStore = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: storeInfo.phone
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: item.src,
            b: index
          };
        }),
        b: common_assets._imports_0,
        c: common_vendor.t(common_vendor.unref(lang).works.title),
        d: common_vendor.o(goToWorks, "4e"),
        e: common_assets._imports_1,
        f: common_vendor.t(common_vendor.unref(lang).appointment.title),
        g: common_vendor.o(goToAppointment, "bc"),
        h: common_assets._imports_2,
        i: common_vendor.t(common_vendor.unref(lang).home.address),
        j: common_vendor.o(showStoreAddress, "36"),
        k: common_assets._imports_3,
        l: common_vendor.t(common_vendor.unref(lang).home.storeInfo),
        m: common_vendor.o(callStore, "df"),
        n: common_vendor.t(common_vendor.unref(lang).home.hotStyle),
        o: common_vendor.f(hotWorks.value, (item, index, i0) => {
          return {
            a: item.src,
            b: common_vendor.t(item.name),
            c: index
          };
        }),
        p: common_vendor.t(common_vendor.unref(lang).home.businessHours),
        q: common_vendor.t(common_vendor.unref(storeInfo).businessHours),
        r: common_vendor.t(common_vendor.unref(lang).home.address),
        s: common_vendor.t(common_vendor.unref(storeInfo).address)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4efedd07"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/user-index/index.js.map
