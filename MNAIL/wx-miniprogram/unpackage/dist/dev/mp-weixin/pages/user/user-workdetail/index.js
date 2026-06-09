"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const item = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      item.value = JSON.parse(decodeURIComponent(options.item));
    });
    const goToOrder = (item2) => {
      common_vendor.index.navigateTo({
        url: "/pages/user/user-appoint/index?item=" + encodeURIComponent(JSON.stringify(item2))
      });
    };
    return (_ctx, _cache) => {
      return {
        a: item.value.src,
        b: common_vendor.t(item.value.name),
        c: common_vendor.t(item.value.tag),
        d: common_vendor.o(($event) => goToOrder(item.value), "26")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e3f21752"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/user-workdetail/index.js.map
