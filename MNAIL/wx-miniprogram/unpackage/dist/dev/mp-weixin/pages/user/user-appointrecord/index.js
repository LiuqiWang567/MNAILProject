"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      selectDate: "",
      selectType: "",
      selectTypeName: "",
      showTypePopup: false,
      // 原始数据，用于每次筛选回溯
      originalList: [
        {
          id: 1,
          serviceType: "美甲",
          serviceName: "纯色美甲+跳色",
          createTime: "2026-06-08",
          appointTime: "2026-06-10 14:00",
          price: 98,
          status: 1,
          statusText: "已完成"
        },
        {
          id: 2,
          serviceType: "美睫",
          serviceName: "自然款睫毛嫁接",
          createTime: "2026-06-09",
          appointTime: "2026-06-11 10:30",
          price: 168,
          status: 0,
          statusText: "待到店"
        },
        {
          id: 3,
          serviceType: "美睫",
          serviceName: "自然款睫毛嫁接",
          createTime: "2026-06-09",
          appointTime: "2026-06-11 10:30",
          price: 168,
          status: 0,
          statusText: "待到店"
        },
        {
          id: 4,
          serviceType: "美睫",
          serviceName: "自然款睫毛嫁接",
          createTime: "2026-06-09",
          appointTime: "2026-06-11 10:30",
          price: 168,
          status: 0,
          statusText: "待到店"
        },
        {
          id: 5,
          serviceType: "美睫",
          serviceName: "自然款睫毛嫁接",
          createTime: "2026-06-09",
          appointTime: "2026-06-11 10:30",
          price: 168,
          status: 0,
          statusText: "待到店"
        },
        {
          id: 6,
          serviceType: "脱毛",
          serviceName: "腋下单次脱毛",
          createTime: "2026-06-07",
          appointTime: "2026-06-09 16:00",
          price: 68,
          status: 2,
          statusText: "已取消"
        }
      ],
      // 页面展示列表
      recordList: []
    };
  },
  onShow() {
    this.getRecordList();
  },
  methods: {
    // 日期选择回调
    onDateChange(e) {
      this.selectDate = e.detail.value;
      this.getRecordList();
    },
    // 选择服务类型
    chooseType(type, name) {
      this.selectType = type;
      this.selectTypeName = name;
      this.showTypePopup = false;
      this.getRecordList();
    },
    // 状态样式匹配
    statusClass(status) {
      switch (status) {
        case 0:
          return "wait";
        case 1:
          return "finish";
        case 2:
          return "cancel";
        default:
          return "";
      }
    },
    // 筛选核心逻辑
    getRecordList() {
      let list = [...this.originalList];
      if (this.selectDate) {
        list = list.filter((item) => item.createTime === this.selectDate);
      }
      if (this.selectType) {
        list = list.filter((item) => item.serviceType === this.selectType);
      }
      this.recordList = list;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.selectDate || "全部日期"),
    b: common_vendor.p({
      type: "arrowdown",
      size: "20"
    }),
    c: $data.selectDate,
    d: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args), "dc"),
    e: common_vendor.t($data.selectTypeName || "全部类型"),
    f: common_vendor.p({
      type: "arrowdown",
      size: "20"
    }),
    g: common_vendor.o(($event) => $data.showTypePopup = true, "b3"),
    h: common_vendor.f($data.recordList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.serviceType),
        b: common_vendor.t(item.createTime),
        c: common_vendor.t(item.serviceName),
        d: common_vendor.t(item.appointTime),
        e: common_vendor.t(item.price),
        f: common_vendor.t(item.statusText),
        g: common_vendor.n($options.statusClass(item.status)),
        h: item.id
      };
    }),
    i: $data.recordList.length === 0
  }, $data.recordList.length === 0 ? {
    j: common_assets._imports_0$2
  } : {}, {
    k: $data.selectType === "" ? 1 : "",
    l: common_vendor.o(($event) => $options.chooseType("", "全部类型"), "b7"),
    m: $data.selectType === "美甲" ? 1 : "",
    n: common_vendor.o(($event) => $options.chooseType("美甲", "美甲"), "67"),
    o: $data.selectType === "纹眉" ? 1 : "",
    p: common_vendor.o(($event) => $options.chooseType("纹眉", "纹眉"), "ae"),
    q: $data.selectType === "美睫" ? 1 : "",
    r: common_vendor.o(($event) => $options.chooseType("美睫", "美睫"), "6c"),
    s: $data.selectType === "脱毛" ? 1 : "",
    t: common_vendor.o(($event) => $options.chooseType("脱毛", "脱毛"), "84"),
    v: common_vendor.o(($event) => $data.showTypePopup = false, "1e"),
    w: common_vendor.o(($event) => $data.showTypePopup = $event, "86"),
    x: common_vendor.p({
      position: "bottom",
      modelValue: $data.showTypePopup
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f0761571"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/user-appointrecord/index.js.map
