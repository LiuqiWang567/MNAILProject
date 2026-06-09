"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-btn",
  props: {
    type: {
      type: String,
      default: "primary"
    }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const onClick = () => emit("click");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(__props.type),
        b: common_vendor.o(onClick, "1c")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3be7e9b5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/my-btn/my-btn.js.map
