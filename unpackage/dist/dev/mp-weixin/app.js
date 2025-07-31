"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/draw/start.js";
  "./pages/draw/draw.js";
  "./pages/draw/card.js";
  "./pages/draw/other.js";
  "./pages/draw/shanhu.js";
  "./pages/draw/zhangyv.js";
  "./pages/draw/youyongquan.js";
  "./pages/draw/weizhi.js";
  "./pages/english/start.js";
  "./pages/english/draw.js";
  "./pages/english/card.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/湖滨街道小程序开发/hubinPING/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
