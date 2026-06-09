"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
const utils_request = require("./utils/request.js");
const lang_index = require("./lang/index.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/user/user-index/index.js";
  "./pages/user/user-my/index.js";
  "./pages/user/user-appoint/index.js";
  "./pages/user/user-appointrecord/index.js";
  "./pages/user/user-works/index.js";
  "./pages/user/user-workdetail/index.js";
  "./pages/user/user-information/index.js";
  "./pages/staff/staff-index/index.js";
  "./pages/staff/staff-my/index.js";
  "./pages/staff/staff-works/index.js";
  "./pages/staff/staff-order/index.js";
  "./pages/staff/staff-member/index.js";
  "./pages/staff/staff-manage/index.js";
  "./pages/staff/staff-information/index.js";
  "./pages/service/index.js";
  "./pages/order/index.js";
  "./pages/mine/index.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      try {
        const store = store_index.useUserStore();
        const token = store.token || "";
        const userInfo = store.userInfo || {};
        common_vendor.index.__f__("log", "at App.vue:15", "token=", token);
        common_vendor.index.__f__("log", "at App.vue:16", "userInfo=", userInfo);
        if (token && userInfo.username) {
          common_vendor.index.__f__("log", "at App.vue:20", "已登录，自动跳转:", userInfo.isAdmin);
          setTimeout(() => {
            if (userInfo.isAdmin) {
              common_vendor.index.switchTab({ url: "/pages/staff/staff-index/index" });
            } else {
              common_vendor.index.switchTab({ url: "/pages/user/user-index/index" });
            }
          }, 300);
        } else {
          common_vendor.index.__f__("log", "at App.vue:32", "未登录，去登录页");
          setTimeout(() => {
            common_vendor.index.reLaunch({ url: "/pages/login/index" });
          }, 300);
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at App.vue:38", "启动判断身份出错:", err);
        common_vendor.index.reLaunch({ url: "/pages/login/index" });
      }
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.config.globalProperties.$request = utils_request.request;
  app.use(pinia);
  app.use(lang_index.i18n);
  return {
    app,
    pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
