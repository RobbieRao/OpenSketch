"use strict";
const common_vendor = require("../../common/vendor.js");
const url = "https://www.zebbagreen.cn/FZLTSJW.TTF";
const url0 = "https://www.zebbagreen.cn/FZLTSJW.TTF";
const _sfc_main = {
  name: "MyPage",
  data() {
    return {
      image1animate: null,
      image2animate: null,
      image3animate: null,
      image4animate: null,
      image5animate: null,
      image6animate: null,
      textanimate: null,
      confirmaimate: null,
      theme: {},
      // 新增theme属性
      themeC: {},
      // 新增theme属性
      themeCC: "",
      // 新增theme属性
      chooseTxt: null,
      firstthemeiconCHINA: ""
    };
  },
  onLoad() {
    common_vendor.index.loadFontFace({
      family: "hh",
      source: `url("${url}")`
    }), common_vendor.index.loadFontFace({
      family: "ht",
      source: `url("${url0}")`
    });
  },
  methods: {
    switchCN() {
      common_vendor.index.navigateTo({
        url: "/pages/draw/start"
      });
    },
    startAnimation() {
      const animate1 = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animate1.translate("10rpx").scale(0.5).step({
        duration: 1e3
      });
      const animate2 = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animate2.translate("-50rpx", "30rpx").scale(0.5).step({
        duration: 1e3
      });
      const animate3 = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animate3.translate("40rpx").scale(1).step({
        duration: 1e3
      });
      const animate4 = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animate4.translate("25rpx", "35rpx").scale(0.5).step({
        duration: 1e3
      });
      const animate5 = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animate5.translate("10rpx", "150rpx").scale(0.5).step({
        duration: 1e3
      });
      const animate6 = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animate6.translate("-50rpx", "50rpx").scale(0.5).step({
        duration: 1e3
      });
      const animate7 = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animate7.translate("-1000rpx").scale(0.5).step({
        duration: 1e3
      });
      const animate8 = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animate8.translate("-750rpx").step({
        duration: 1e3
      });
      const animatetxt = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animatetxt.opacity(1).step({
        duration: 1e3
      });
      this.image1animate = animate1.export();
      this.image2animate = animate2.export();
      this.image3animate = animate3.export();
      this.image4animate = animate4.export();
      this.image5animate = animate5.export();
      this.image6animate = animate6.export();
      this.textanimate = animate7.export();
      this.confirmaimate = animate8.export();
      this.chooseTxt = animatetxt.export();
    },
    handleImageTap(index) {
      const resetAnimations = [];
      const texts = [
        "sea ​​urchin",
        "starfish",
        "Crab",
        "whale",
        "dolphin",
        "jellyfish"
      ];
      const textsC = [
        "https://www.zebbagreen.cn/static/海胆icon.svg",
        "https://www.zebbagreen.cn/static/海星icon.svg",
        "https://www.zebbagreen.cn/static/螃蟹icon.svg",
        "https://www.zebbagreen.cn/static/鲸鱼icon.svg",
        "https://www.zebbagreen.cn/static/海豚icon.svg",
        "https://www.zebbagreen.cn/static/水母icon.svg"
      ];
      const textsCC = [
        "sea ​​urchin",
        "starfish",
        "Crab",
        "whale",
        "dolphin",
        "jellyfish"
      ];
      for (let i = 1; i <= 6; i++) {
        const resetAnimation = common_vendor.index.createAnimation({
          duration: 200,
          timingFunction: "ease"
        });
        if (i === index) {
          resetAnimation.scale(1).step();
        } else {
          resetAnimation.scale(0.5).step();
        }
        resetAnimations.push(resetAnimation.export());
      }
      this.image1animate = resetAnimations[0];
      this.image2animate = resetAnimations[1];
      this.image3animate = resetAnimations[2];
      this.image4animate = resetAnimations[3];
      this.image5animate = resetAnimations[4];
      this.image6animate = resetAnimations[5];
      this.theme.text = texts[index - 1];
      this.themeC.text = textsC[index - 1];
      this.themeCC = textsCC[index - 1];
      console.log(this.themeC.text);
    },
    godraw() {
      common_vendor.index.navigateTo({
        url: "draw?prompt=" + this.theme.text + "&firstthemeicon=" + this.themeC.text + "&firstthemeiconCHINA=" + this.themeCC
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.changecolor,
    b: _ctx.changecolor,
    c: _ctx.changecolor,
    d: common_vendor.o(($event) => $options.handleImageTap(1)),
    e: $data.image1animate,
    f: $data.image2animate,
    g: common_vendor.o(($event) => $options.handleImageTap(2)),
    h: $data.image4animate,
    i: common_vendor.o(($event) => $options.handleImageTap(4)),
    j: $data.image6animate,
    k: common_vendor.o(($event) => $options.handleImageTap(6)),
    l: $data.image5animate,
    m: common_vendor.o(($event) => $options.handleImageTap(5)),
    n: $data.image3animate,
    o: common_vendor.o(($event) => $options.handleImageTap(3)),
    p: common_vendor.o((...args) => $options.startAnimation && $options.startAnimation(...args)),
    q: common_vendor.o((...args) => $options.switchCN && $options.switchCN(...args)),
    r: $data.textanimate,
    s: $data.confirmaimate,
    t: common_vendor.o((...args) => $options.godraw && $options.godraw(...args)),
    v: common_vendor.t($data.themeCC ? $data.themeCC : "animal"),
    w: $data.chooseTxt
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/湖滨街道小程序开发/hubinPING/pages/english/start.vue"]]);
wx.createPage(MiniProgramPage);
