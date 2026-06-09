"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
if (!Array) {
  const _easycom_my_input2 = common_vendor.resolveComponent("my-input");
  const _easycom_my_btn2 = common_vendor.resolveComponent("my-btn");
  (_easycom_my_input2 + _easycom_my_btn2)();
}
const _easycom_my_input = () => "../../components/my-input/my-input.js";
const _easycom_my_btn = () => "../../components/my-btn/my-btn.js";
if (!Math) {
  (_easycom_my_input + _easycom_my_btn)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    common_vendor.ref("");
    store_index.useUserStore();
    const handleLogin = async () => {
      username.value = "wangliuqi";
      password.value = "666666";
      common_vendor.index.reLaunch({ url: "/pages/staff/staff-index/index" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => username.value = $event, "57"),
        b: common_vendor.p({
          placeholder: "请输入账号",
          modelValue: username.value
        }),
        c: common_vendor.o(($event) => password.value = $event, "33"),
        d: common_vendor.p({
          placeholder: "请输入密码",
          password: true,
          modelValue: password.value
        }),
        e: common_vendor.o(handleLogin, "20"),
        f: common_vendor.p({
          loading: loading.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
