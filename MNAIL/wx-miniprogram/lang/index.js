// lang/index.js
// 全局语言字段，所有页面都能调用
export default {
  // 底部导航
  tabbar: {
    home: '首页',
    works: '款式',
    appointment: '预约',
    mine: '我的'
  },
  // 首页模块
  home: {
    welcome: '欢迎来到XX美甲店',
    hotStyle: '今日主推',
    storeInfo: '门店简介',
    businessHours: '营业时间',
    address: '门店地址'
  },
  // ======================================
    // 👇👇👇 我给你补齐的【员工端语言包】
    // ======================================
    // ================= 员工端补充：款式管理 =================
    staff: {
      my: '我的',
      storeInfo: '门店信息',
      resetPwd: '修改密码',
      resetPwdTip: '请联系店主重置密码',
      about: '关于系统',
      logout: '退出登录',
      logoutTipTitle: '确认退出',
      logoutTip: '确定要退出管理员账号吗？',
      
      dashboard: '管理后台',
      waitConfirm: '待确认预约',
      todayOrder: '今日预约',
      orderManage: '预约管理',
      worksManage: '款式管理',
      timeManage: '时段管理',
  
      orderList: '预约列表',
      all: '全部',
      wait: '待确认',
      confirmed: '已确认',
      finished: '已完成',
      cancel: '取消预约',
      confirmOrder: '确认预约',
      cancelSuccess: '取消成功',
      confirmSuccess: '确认成功',
  
      // 👇 新增：款式管理专用
      uploadWork: '上传款式',
      uploadSuccess: '上传成功'
    },
  
    // 👇 新增：公共语言
    common: {
      cancel: '取消',
      confirm: '确定',
      deleteTip: '确定要删除该款式吗？'
    },
  // 款式页
  works: {
    title: '美甲款式',
    categoryAll: '全部',
    categorySolid: '纯色款',
    categoryHand: '手绘款',
    categoryFrench: '法式款'
  },
  // 预约页
  appointment: {
    title: '在线预约',
    project: '预约项目',
    date: '选择日期',
    time: '选择时段',
    name: '联系人姓名',
    phone: '联系手机号',
    remark: '备注',
    submit: '提交预约',
    success: '预约成功！店主会尽快联系你确认~'
  },
  // 个人中心
  mine: {
    myAppointment: '我的预约',
    myCollection: '我的收藏',
    storeNotice: '门店须知',
    aboutUs: '关于我们'
  }
}