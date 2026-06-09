"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-input",
  props: {
    modelValue: String,
    placeholder: String,
    password: Boolean
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const value = common_vendor.computed({
      get() {
        return props.modelValue;
      },
      set(v) {
        emit("update:modelValue", v);
      }
    });
    const onInput = (e) => {
      value.value = e.detail.value;
    };
    return (_ctx, _cache) => {
      return {
        a: __props.placeholder,
        b: __props.password,
        c: common_vendor.o([($event) => value.value = $event.detail.value, onInput], "32"),
        d: value.value
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1889191f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/my-input/my-input.js.map
