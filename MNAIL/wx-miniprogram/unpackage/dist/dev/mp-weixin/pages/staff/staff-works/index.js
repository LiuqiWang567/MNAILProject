"use strict";
const common_vendor = require("../../../common/vendor.js");
const config_index = require("../../../config/index.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const lang = config_index.config.globalLang;
    const categoryList = common_vendor.ref([
      { id: 1, name: lang.works.categorySolid },
      { id: 2, name: lang.works.categoryHand },
      { id: 3, name: lang.works.categoryFrench }
    ]);
    const categoryNames = common_vendor.computed(() => categoryList.value.map((i) => i.name));
    const workList = common_vendor.ref([
      { url: "/static/images/works/1.jpg", name: "裸粉简约", cid: 1, tag: "热门" },
      { url: "/static/images/works/2.jpg", name: "手绘小花", cid: 2, tag: "新品" }
    ]);
    const activeCid = common_vendor.ref(1);
    const showList = common_vendor.computed(() => {
      return workList.value.filter((i) => i.cid === activeCid.value);
    });
    const selectCategory = (id) => activeCid.value = id;
    const showPopup = common_vendor.ref(false);
    const uploadCid = common_vendor.ref(0);
    const uploadTag = common_vendor.ref("");
    const tempFilePath = common_vendor.ref("");
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          tempFilePath.value = res.tempFilePaths[0];
          uploadTag.value = "";
          uploadCid.value = 0;
          showPopup.value = true;
        }
      });
    };
    const onChangeCategory = (e) => {
      uploadCid.value = Number(e.detail.value) + 1;
    };
    const doUpload = () => {
      if (!tempFilePath.value)
        return;
      workList.value.unshift({
        url: tempFilePath.value,
        name: categoryNames.value[uploadCid.value - 1],
        cid: uploadCid.value,
        tag: uploadTag.value || ""
      });
      showPopup.value = false;
      common_vendor.index.showToast({ title: lang.staff.uploadSuccess, icon: "success" });
    };
    const closePopup = () => showPopup.value = false;
    const deleteWork = (index) => {
      common_vendor.index.showModal({
        title: lang.common.deleteTip,
        success: (res) => {
          if (res.confirm)
            workList.value.splice(index, 1);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(categoryList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: activeCid.value === item.id ? 1 : "",
            c: item.id,
            d: common_vendor.o(($event) => selectCategory(item.id), item.id)
          };
        }),
        b: common_vendor.f(showList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.url,
            b: item.tag
          }, item.tag ? {
            c: common_vendor.t(item.tag)
          } : {}, {
            d: common_vendor.t(item.name),
            e: common_vendor.o(($event) => deleteWork(index), index),
            f: index
          });
        }),
        c: common_vendor.o(chooseImage, "11"),
        d: showPopup.value
      }, showPopup.value ? {
        e: common_vendor.o(closePopup, "de")
      } : {}, {
        f: showPopup.value
      }, showPopup.value ? {
        g: common_vendor.t(common_vendor.unref(lang).staff.uploadWork),
        h: common_vendor.t(categoryNames.value[uploadCid.value]),
        i: categoryNames.value,
        j: common_vendor.o(onChangeCategory, "20"),
        k: uploadTag.value,
        l: common_vendor.o(($event) => uploadTag.value = $event.detail.value, "07"),
        m: common_vendor.t(common_vendor.unref(lang).common.cancel),
        n: common_vendor.o(closePopup, "29"),
        o: common_vendor.t(common_vendor.unref(lang).common.confirm),
        p: common_vendor.o(doUpload, "76")
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24ee9a4f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/staff/staff-works/index.js.map
