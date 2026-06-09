"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        avatar: "/static/logo.png",
        // 你可以换成网络头像
        nickname: "张三",
        age: 26,
        level: 3,
        phone: "13800138000",
        balance: 1688.5
      }
    };
  },
  methods: {
    // 修改头像
    changeAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          this.userInfo.avatar = res.tempFilePaths[0];
        }
      });
    },
    // 修改名字
    editName() {
      common_vendor.index.showModal({
        title: "修改用户名",
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            this.userInfo.nickname = res.content;
          }
        }
      });
    },
    // 去编辑页
    goEdit() {
      common_vendor.index.navigateTo({
        url: "/pages/edit-info/edit-info"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.avatar,
    b: common_vendor.o((...args) => $options.changeAvatar && $options.changeAvatar(...args), "41"),
    c: common_vendor.t($data.userInfo.nickname),
    d: common_vendor.o((...args) => $options.editName && $options.editName(...args), "a7"),
    e: common_vendor.t($data.userInfo.age),
    f: common_vendor.t($data.userInfo.level),
    g: common_vendor.n(`level-${$data.userInfo.level}`),
    h: common_vendor.t($data.userInfo.phone),
    i: common_vendor.t($data.userInfo.balance),
    j: common_vendor.o((...args) => $options.goEdit && $options.goEdit(...args), "8f")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-20a07ddc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/user-information/index.js.map
