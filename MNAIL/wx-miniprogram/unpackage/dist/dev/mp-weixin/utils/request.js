"use strict";
const common_vendor = require("../common/vendor.js");
const config_index = require("../config/index.js");
const request = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: config_index.config.baseUrl + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Authorization": "Bearer " + common_vendor.index.getStorageSync("token"),
        "Content-Type": "application/json"
      },
      success: (res) => {
        if (res.statusCode === 401) {
          common_vendor.index.removeStorageSync("token");
          common_vendor.index.navigateTo({ url: "/pages/login/index" });
          return;
        }
        resolve(res.data);
      },
      fail: (err) => reject(err)
    });
  });
};
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
