"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    token: "",
    userInfo: {}
  }),
  actions: {
    setToken(token) {
      this.token = token;
      common_vendor.index.setStorageSync("token", token);
    },
    setUserInfo(info) {
      this.userInfo = info;
      common_vendor.index.setStorageSync("userInfo", info);
    }
  }
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map
