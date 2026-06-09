"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  CustomTabbar();
}
const CustomTabbar = () => "../../../components/custom-tabbar/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const activeCategory = common_vendor.ref(0);
    const categoryList = common_vendor.ref([
      { id: 0, name: "全部" },
      { id: 1, name: "美甲" },
      { id: 2, name: "美睫" },
      { id: 3, name: "护肤" },
      { id: 4, name: "纹眉" },
      { id: 5, name: "脱毛" }
    ]);
    const worksList = common_vendor.ref([
      // 美甲
      { src: "/static/images/works/1.jpg", name: "温柔裸粉美甲", tag: "热门", category: 1 },
      { src: "/static/images/works/2.jpg", name: "手绘小花美甲", tag: "新品", category: 1 },
      { src: "/static/images/works/3.jpg", name: "法式白边美甲", tag: "爆款", category: 1 },
      // 美睫
      { src: "/static/images/works/1.jpg", name: "自然款美睫", tag: "推荐", category: 2 },
      { src: "/static/images/works/2.jpg", name: "浓密款美睫", tag: "热销", category: 2 },
      // 护肤
      { src: "/static/images/works/3.jpg", name: "深层补水护理", tag: "舒缓", category: 3 },
      { src: "/static/images/works/4.jpg", name: "净肤祛痘护理", tag: "口碑", category: 3 },
      // 纹眉
      { src: "/static/images/works/1.jpg", name: "野生眉", tag: "气质", category: 4 },
      { src: "/static/images/works/2.jpg", name: "雾面眉", tag: "自然", category: 4 },
      // 脱毛
      { src: "/static/images/works/3.jpg", name: "腋下脱毛", tag: "平价", category: 5 },
      { src: "/static/images/works/4.jpg", name: "四肢脱毛", tag: "套餐", category: 5 }
    ]);
    const changeCategory = (id) => {
      activeCategory.value = id;
    };
    const filteredWorks = common_vendor.computed(() => {
      if (activeCategory.value === 0)
        return worksList.value;
      return worksList.value.filter((item) => item.category === activeCategory.value);
    });
    const goToDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/user/user-workdetail/index?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(categoryList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: activeCategory.value === item.id ? 1 : "",
            c: item.id,
            d: common_vendor.o(($event) => changeCategory(item.id), item.id)
          };
        }),
        b: common_vendor.f(filteredWorks.value, (item, index, i0) => {
          return {
            a: item.src,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.tag),
            d: index,
            e: common_vendor.o(($event) => goToDetail(item), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fca09efd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/user-works/index.js.map
