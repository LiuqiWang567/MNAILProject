"use strict";
const common_vendor = require("../../../common/vendor.js");
const config_index = require("../../../config/index.js");
if (!Math) {
  CustomTabbar();
}
const CustomTabbar = () => "../../../components/custom-tabbar/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const lang = config_index.config.globalLang || {};
    const formData = common_vendor.reactive({
      project: "",
      date: "",
      time: "",
      name: "",
      phone: "",
      remark: ""
    });
    const projectList = [
      "美甲款式",
      "手部护理",
      "足部护理",
      "美睫",
      "卸甲",
      "修补美甲",
      "画眉",
      "种眉毛",
      "脸部护理"
    ];
    const timeList = ["10:00-11:00", "11:00-12:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "19:00-20:00", "20:00-21:00"];
    const changeProject = (e) => {
      formData.project = projectList[e.detail.value];
    };
    const changeDate = (e) => {
      formData.date = e.detail.value;
    };
    const changeTime = (e) => {
      formData.time = timeList[e.detail.value];
    };
    const submitAppointment = () => {
      var _a;
      if (!formData.project || !formData.date || !formData.time || !formData.name || !formData.phone) {
        common_vendor.index.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        common_vendor.index.showToast({ title: "手机号格式不正确", icon: "none" });
        return;
      }
      common_vendor.index.showModal({
        title: "提示",
        content: ((_a = lang.appointment) == null ? void 0 : _a.success) || "提交成功，我们会尽快与您联系！",
        showCancel: false,
        success: () => {
          formData.project = "";
          formData.date = "";
          formData.time = "";
          formData.name = "";
          formData.phone = "";
          formData.remark = "";
        }
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      return {
        a: common_vendor.t(((_b = (_a = common_vendor.unref(lang)) == null ? void 0 : _a.appointment) == null ? void 0 : _b.project) || "预约项目"),
        b: common_vendor.t(formData.project || "请选择项目"),
        c: projectList,
        d: common_vendor.o(changeProject, "ba"),
        e: common_vendor.t(((_d = (_c = common_vendor.unref(lang)) == null ? void 0 : _c.appointment) == null ? void 0 : _d.date) || "选择日期"),
        f: common_vendor.t(formData.date || "请选择日期"),
        g: common_vendor.o(changeDate, "a3"),
        h: common_vendor.t(((_f = (_e = common_vendor.unref(lang)) == null ? void 0 : _e.appointment) == null ? void 0 : _f.time) || "选择时段"),
        i: common_vendor.t(formData.time || "请选择时段"),
        j: timeList,
        k: common_vendor.o(changeTime, "3a"),
        l: common_vendor.t(((_h = (_g = common_vendor.unref(lang)) == null ? void 0 : _g.appointment) == null ? void 0 : _h.name) || "联系人姓名"),
        m: formData.name,
        n: common_vendor.o(($event) => formData.name = $event.detail.value, "b4"),
        o: common_vendor.t(((_j = (_i = common_vendor.unref(lang)) == null ? void 0 : _i.appointment) == null ? void 0 : _j.phone) || "联系手机号"),
        p: formData.phone,
        q: common_vendor.o(($event) => formData.phone = $event.detail.value, "71"),
        r: common_vendor.t(((_l = (_k = common_vendor.unref(lang)) == null ? void 0 : _k.appointment) == null ? void 0 : _l.remark) || "备注"),
        s: formData.remark,
        t: common_vendor.o(($event) => formData.remark = $event.detail.value, "d8"),
        v: common_vendor.t(((_n = (_m = common_vendor.unref(lang)) == null ? void 0 : _m.appointment) == null ? void 0 : _n.submit) || "提交预约"),
        w: common_vendor.o(submitAppointment, "ac")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57b4dab7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/user-appoint/index.js.map
