"use strict";
const common_vendor = require("../../common/vendor.js");
const url = "https://www.zebbagreen.cn/SourceHanSansCN-Heavy.ttf";
const _sfc_main = {
  data() {
    return {
      prompt: "Sea Waves",
      imgsrc: "https://www.zebbagreen.cn/static/珊瑚icon.svg"
    };
  },
  mounted() {
    common_vendor.index.loadFontFace({
      family: "ht",
      source: `url("${url}")`
    });
  },
  methods: {
    gotodraw() {
      common_vendor.index.navigateTo({
        url: "draw?prompt=" + this.prompt + "&firstthemeicon=" + this.imgsrc
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.changecolor,
    b: _ctx.changecolor,
    c: _ctx.changecolor,
    d: common_vendor.o((...args) => $options.gotodraw && $options.gotodraw(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/湖滨街道小程序开发/hubinPING/pages/draw/zhangyv.vue"]]);
wx.createPage(MiniProgramPage);
