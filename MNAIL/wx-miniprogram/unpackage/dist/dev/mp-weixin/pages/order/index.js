"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_card2 = common_vendor.resolveComponent("my-card");
  _easycom_my_card2();
}
const _easycom_my_card = () => "../../components/my-card/my-card.js";
if (!Math) {
  _easycom_my_card();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    onLoad(() => {
      common_vendor.index.__f__("log", "at pages/order/index.vue:12", "页面加载成功");
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-17a44f9d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/index.js.map
