"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const memberList = common_vendor.ref([
      { id: 1, name: "李女士", phone: "13800138000", level: "VIP", levelId: 1, balance: 520, birthday: "1995-10-05", createTime: "2025-05-01", remark: "老顾客" },
      { id: 2, name: "张小姐", phone: "13900139000", level: "钻石", levelId: 2, balance: 1280, birthday: "1998-02-12", createTime: "2025-05-03", remark: "喜欢美甲" },
      { id: 3, name: "王姐", phone: "13700137000", level: "普通", levelId: 0, balance: 320, birthday: "1990-08-20", createTime: "2025-06-01", remark: "" }
    ]);
    const levelList = ["普通", "VIP", "钻石"];
    const searchKey = common_vendor.ref("");
    const currentMember = common_vendor.ref(null);
    const showDetail = common_vendor.ref(false);
    const showForm = common_vendor.ref(false);
    const isEdit = common_vendor.ref(false);
    const showSort = common_vendor.ref(false);
    const form = common_vendor.ref({
      id: null,
      name: "",
      phone: "",
      levelId: 0,
      birthday: "",
      remark: "",
      balance: 0
    });
    const showList = common_vendor.computed(() => {
      let arr = [...memberList.value];
      if (searchKey.value) {
        arr = arr.filter((i) => i.name.includes(searchKey.value));
      }
      return arr;
    });
    const openDetail = (item) => {
      currentMember.value = item;
      showDetail.value = true;
    };
    const addMember = () => {
      isEdit.value = false;
      form.value = { id: null, name: "", phone: "", levelId: 0, birthday: "", remark: "", balance: 0 };
      showForm.value = true;
    };
    const editMember = () => {
      isEdit.value = true;
      form.value = { ...currentMember.value };
      showDetail.value = false;
      showForm.value = true;
    };
    const saveMember = () => {
      if (!form.value.name || !form.value.phone) {
        common_vendor.index.showToast({ icon: "none", title: "请填写完整信息" });
        return;
      }
      if (isEdit.value) {
        const idx = memberList.value.findIndex((i) => i.id === form.value.id);
        memberList.value[idx] = { ...form.value };
        currentMember.value = form.value;
      } else {
        memberList.value.unshift({
          ...form.value,
          id: Date.now(),
          createTime: (/* @__PURE__ */ new Date()).toLocaleString().substr(0, 10)
        });
      }
      showForm.value = false;
    };
    const sortByBalance = () => {
      memberList.value.sort((a, b) => b.balance - a.balance);
      showSort.value = false;
    };
    const sortByTime = () => {
      memberList.value.sort((a, b) => b.createTime.localeCompare(a.createTime));
      showSort.value = false;
    };
    const openSort = () => showSort.value = true;
    const onLevelChange = (e) => form.value.levelId = Number(e.detail.value);
    const recharge = () => {
      common_vendor.index.showModal({
        title: "充值",
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            form.value.balance = Number(form.value.balance) + Number(res.content);
          }
        }
      });
    };
    const consume = () => {
      common_vendor.index.showModal({
        title: "消费扣款",
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            const val = Number(res.content);
            if (val > form.value.balance) {
              common_vendor.index.showToast({ title: "余额不足", icon: "none" });
              return;
            }
            form.value.balance -= val;
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: searchKey.value,
        b: common_vendor.o(($event) => searchKey.value = $event.detail.value, "51"),
        c: common_vendor.o(openSort, "37"),
        d: common_vendor.o(addMember, "5b"),
        e: common_vendor.f(showList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.level),
            c: common_vendor.t(item.balance),
            d: item.id,
            e: common_vendor.o(($event) => openDetail(item), item.id)
          };
        }),
        f: showDetail.value
      }, showDetail.value ? {
        g: common_vendor.o(($event) => showDetail.value = false, "1f")
      } : {}, {
        h: showDetail.value
      }, showDetail.value ? {
        i: common_vendor.t(currentMember.value.name),
        j: common_vendor.t(currentMember.value.phone),
        k: common_vendor.t(currentMember.value.level),
        l: common_vendor.t(currentMember.value.balance),
        m: common_vendor.t(currentMember.value.birthday || "未设置"),
        n: common_vendor.t(currentMember.value.createTime),
        o: common_vendor.t(currentMember.value.remark || "无"),
        p: common_vendor.o(editMember, "0d"),
        q: common_vendor.o(($event) => showDetail.value = false, "3a")
      } : {}, {
        r: showForm.value
      }, showForm.value ? {
        s: common_vendor.o(($event) => showForm.value = false, "fb")
      } : {}, {
        t: showForm.value
      }, showForm.value ? common_vendor.e({
        v: common_vendor.t(isEdit.value ? "编辑会员" : "新增会员"),
        w: form.value.name,
        x: common_vendor.o(($event) => form.value.name = $event.detail.value, "77"),
        y: form.value.phone,
        z: common_vendor.o(($event) => form.value.phone = $event.detail.value, "04"),
        A: form.value.birthday,
        B: common_vendor.o(($event) => form.value.birthday = $event.detail.value, "49"),
        C: form.value.balance,
        D: common_vendor.o(($event) => form.value.balance = $event.detail.value, "aa"),
        E: common_vendor.t(levelList[form.value.levelId]),
        F: levelList,
        G: common_vendor.o(onLevelChange, "41"),
        H: form.value.remark,
        I: common_vendor.o(($event) => form.value.remark = $event.detail.value, "f4"),
        J: isEdit.value
      }, isEdit.value ? {
        K: common_vendor.o(recharge, "89"),
        L: common_vendor.o(consume, "fe")
      } : {}, {
        M: common_vendor.o(saveMember, "00")
      }) : {}, {
        N: showSort.value
      }, showSort.value ? {
        O: common_vendor.o(($event) => showSort.value = false, "5b")
      } : {}, {
        P: showSort.value
      }, showSort.value ? {
        Q: common_vendor.o(sortByBalance, "4c"),
        R: common_vendor.o(sortByTime, "4f")
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a7b132eb"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/staff/staff-member/index.js.map
