"use strict";
const lang_index = require("../lang/index.js");
const config = {
  baseUrl: "http://localhost:5002/api",
  // 你的 .NET 后端地址
  globalLang: lang_index.i18n,
  // 挂载语言到全局
  // 门店基础信息
  storeInfo: {
    name: "XX美甲店",
    phone: "13800138000",
    address: "上海市浦东新区华夏东路XX号",
    businessHours: "周一至周日 10:00-21:00"
  }
};
exports.config = config;
//# sourceMappingURL=../../.sourcemap/mp-weixin/config/index.js.map
