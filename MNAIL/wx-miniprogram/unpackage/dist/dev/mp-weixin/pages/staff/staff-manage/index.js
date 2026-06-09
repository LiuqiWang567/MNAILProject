"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const employeeList = common_vendor.ref([
      { id: 1, name: "小美", phone: "13800138000", role: "美甲师", skill: "纯色、手绘、法式" },
      { id: 2, name: "小丽", phone: "13900139000", role: "美睫师", skill: "自然款、浓密款" },
      { id: 3, name: "张店长", phone: "13700137000", role: "店长", skill: "全店管理、技术指导" }
    ]);
    const searchKey = common_vendor.ref("");
    const showForm = common_vendor.ref(false);
    const isEdit = common_vendor.ref(false);
    const editIndex = common_vendor.ref(-1);
    const form = common_vendor.ref({
      id: null,
      name: "",
      phone: "",
      role: "",
      skill: ""
    });
    const showList = common_vendor.computed(() => {
      let arr = [...employeeList.value];
      if (searchKey.value) {
        const kw = searchKey.value.toLowerCase();
        arr = arr.filter(
          (i) => i.name.includes(kw) || i.phone.includes(kw) || i.role.includes(kw) || i.skill.includes(kw)
        );
      }
      return arr;
    });
    const addEmployee = () => {
      isEdit.value = false;
      form.value = { id: null, name: "", phone: "", role: "", skill: "" };
      showForm.value = true;
    };
    const editEmployee = (item, index) => {
      isEdit.value = true;
      editIndex.value = index;
      form.value = { ...item };
      showForm.value = true;
    };
    const saveEmployee = () => {
      if (!form.value.name || !form.value.phone) {
        common_vendor.index.showToast({ icon: "none", title: "请填写完整信息" });
        return;
      }
      if (isEdit.value) {
        employeeList.value[editIndex.value] = { ...form.value };
      } else {
        employeeList.value.unshift({
          ...form.value,
          id: Date.now()
        });
      }
      showForm.value = false;
    };
    const deleteEmployee = (id, index) => {
      common_vendor.index.showModal({
        title: "确认删除",
        content: "确定要删除该员工吗？",
        success: (res) => {
          if (res.confirm) {
            employeeList.value.splice(index, 1);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: searchKey.value,
        b: common_vendor.o(($event) => searchKey.value = $event.detail.value, "32"),
        c: common_vendor.o(addEmployee, "eb"),
        d: common_vendor.f(showList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.role),
            c: common_vendor.t(item.phone),
            d: common_vendor.t(item.skill),
            e: common_vendor.o(($event) => editEmployee(item, index), item.id),
            f: common_vendor.o(($event) => deleteEmployee(item.id, index), item.id),
            g: item.id
          };
        }),
        e: showForm.value
      }, showForm.value ? {
        f: common_vendor.o(($event) => showForm.value = false, "00")
      } : {}, {
        g: showForm.value
      }, showForm.value ? {
        h: common_vendor.t(isEdit.value ? "编辑员工" : "新增员工"),
        i: form.value.name,
        j: common_vendor.o(($event) => form.value.name = $event.detail.value, "33"),
        k: form.value.phone,
        l: common_vendor.o(($event) => form.value.phone = $event.detail.value, "96"),
        m: form.value.role,
        n: common_vendor.o(($event) => form.value.role = $event.detail.value, "5d"),
        o: form.value.skill,
        p: common_vendor.o(($event) => form.value.skill = $event.detail.value, "1c"),
        q: common_vendor.o(saveEmployee, "1c")
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6eb35ce"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/staff/staff-manage/index.js.map
