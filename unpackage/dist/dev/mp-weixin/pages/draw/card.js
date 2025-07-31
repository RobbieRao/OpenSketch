"use strict";
const common_vendor = require("../../common/vendor.js");
const url = "https://www.zebbagreen.cn/SourceHanSansCN-Heavy.ttf";
const _sfc_main = {
  data() {
    return {
      canvasContext: null,
      isDrawing: false,
      inputValue: "",
      currentPath: [],
      animationFrameID: null,
      imageFile: null,
      uploadedImage: null,
      generatedImage: null,
      base64Image: "",
      uploadCount: 9999,
      disableUploadButton: false,
      inputText: "",
      touchStartX: 0,
      // 触摸起始位置
      buttonTranslateX: 0,
      // 平移距离初始值为 0
      maxTranslateX: 175,
      // 最大平移距离
      isUploaded: false,
      // 标记是否已经执行过 onUploadscreen()
      hasReachedMaxPosition: false,
      // 标记是否已经达到最大位置
      //姓名卡上的属性名
      attributes: "",
      //获取日期
      currentDate: "",
      //背景颜色动画
      changecolor: {},
      randomNumber: 0,
      // 保存随机数
      username: "",
      firstthemeiconCHINA: ""
    };
  },
  computed: {
    buttonStyle() {
      return {
        transform: `translateX(${this.buttonTranslateX}px)`
        // 使用transform平移按钮
      };
    },
    sliderStyle() {
      const buttonTranslateX = this.buttonTranslateX;
      const sliderWidth = 98 + buttonTranslateX * 1.75;
      return {
        position: "absolute",
        width: `${sliderWidth}rpx`,
        height: "98rpx",
        borderRadius: "60rpx",
        border: "1.5px solid #000",
        backgroundColor: "#D2396A"
      };
    }
  },
  mounted() {
    this.getCurrentDate();
    this.generateRandomNumber();
  },
  onLoad(options) {
    this.generatedImage = options.generatedImage;
    this.inputText = options.inputText;
    this.username = options.username;
    this.firstthemeiconCHINA = options.firstthemeiconCHINA;
    this.attributes = this.firstthemeiconCHINA;
    if (options.attributes !== "换主题/CHANGE THEME") {
      this.attributes = options.attributes;
    }
    console.log(this.firstthemeiconCHINA);
    common_vendor.index.loadFontFace({
      family: "ht",
      source: `url("${url}")`
    });
    const animation = common_vendor.index.createAnimation({
      duration: 1e3,
      timingFunction: "linear"
    });
    const repeatAnimation = () => {
      animation.rotate(90).step().rotate(180).step();
      this.changecolor = animation.export();
      setTimeout(() => {
        repeatAnimation();
      }, 2e3);
    };
    repeatAnimation();
  },
  onShow() {
  },
  methods: {
    //随机数生成
    generateRandomNumber() {
      const min = 100;
      const max = 999;
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      this.randomNumber = random.toString();
    },
    //背景旋转动画
    startRotateAnimation() {
      const animation = common_vendor.index.createAnimation({
        duration: 5e3,
        timingFunction: "linear"
      });
      const repeatAnimation = () => {
        animation.rotate(360).step().rotate(0).step();
        this.changecolor = animation.export();
        setTimeout(() => {
          repeatAnimation();
        }, 2e3);
      };
      repeatAnimation();
    },
    //获得日期方法
    getCurrentDate() {
      const date = /* @__PURE__ */ new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      this.currentDate = `${year}.${month}.${day}`;
    },
    //分享小程序
    onShareButtonClick() {
      common_vendor.index.share({
        title: "分享标题",
        content: "分享内容",
        path: "/pages/draw/draw"
        // 当前页面的路径，可根据实际情况进行修改
      }).then(() => {
        console.log("分享成功");
      }).catch((error) => {
        console.log("分享失败", error);
      });
    },
    onTouchStart(event) {
      this.touchStartX = event.changedTouches[0].pageX;
    },
    onTouchMove(event) {
      const touchX = event.changedTouches[0].pageX;
      const distance = touchX - this.touchStartX;
      this.buttonTranslateX = Math.max(0, Math.min(distance, this.maxTranslateX));
      const maxTranslateX = 175;
      if (!this.hasReachedMaxPosition && Math.abs(distance) >= maxTranslateX) {
        this.hasReachedMaxPosition = true;
        this.onUploadscreen();
      }
      if (this.hasReachedMaxPosition) {
        this.buttonTranslateX = 0;
      }
    },
    onTouchEnd() {
      if (this.hasReachedMaxPosition) {
        this.buttonTranslateX = 0;
        this.isUploaded = true;
      } else {
        this.buttonTranslateX = 0;
        this.isUploaded = false;
      }
      this.hasReachedMaxPosition = false;
    },
    upLoadWaiting() {
      common_vendor.index.showLoading({
        title: "发射中...",
        mask: true
        // 遮罩层，禁止用户进行其他操作
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          title: "发射成功",
          content: `剩余次数(${this.uploadCount})`,
          showCancel: false,
          // 不显示取消按钮
          success: () => {
          }
        });
      }, 3e3);
    },
    onUploadscreen() {
      this.upLoadWaiting();
      this.uploadCount--;
      const url2 = "https://x5334j0832.goho.co/upload_image";
      const imageData = {
        image: this.generatedImage.split(",")[1]
        // 获取生成的图片的Base64数据部分
      };
      common_vendor.index.request({
        url: url2,
        method: "POST",
        data: JSON.stringify(imageData),
        success: (response) => {
          console.log(response.data);
        },
        fail: (error) => {
          console.error("Error:", error);
        }
      });
      if (this.uploadCount === 0) {
        this.onUploadscreen = () => {
          console.log("函数被禁用");
        };
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.changecolor,
    b: $data.changecolor,
    c: $data.changecolor,
    d: common_vendor.t($data.inputText ? $data.inputText : "泳动小精灵"),
    e: $data.generatedImage
  }, $data.generatedImage ? {
    f: $data.generatedImage
  } : {}, {
    g: common_vendor.t($data.randomNumber),
    h: common_vendor.t($data.username),
    i: common_vendor.t($data.inputText ? $data.inputText : "泳动小精灵"),
    j: common_vendor.t($data.attributes ? $data.attributes : "未知"),
    k: common_vendor.t($data.currentDate),
    l: common_vendor.o((...args) => $options.onShareButtonClick && $options.onShareButtonClick(...args)),
    m: common_vendor.s($options.sliderStyle),
    n: common_vendor.s($options.buttonStyle),
    o: common_vendor.s({
      "pointer-events": $data.uploadCount === 0 ? "none" : "auto"
    }),
    p: common_vendor.o((...args) => $options.onTouchStart && $options.onTouchStart(...args)),
    q: common_vendor.o((...args) => $options.onTouchMove && $options.onTouchMove(...args)),
    r: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/湖滨街道小程序开发/hubinPING/pages/draw/card.vue"]]);
wx.createPage(MiniProgramPage);
