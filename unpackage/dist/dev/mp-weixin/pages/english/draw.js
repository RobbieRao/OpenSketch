"use strict";
const common_vendor = require("../../common/vendor.js");
const url = "https://www.zebbagreen.cn/FZLTSJW.TTF";
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
      //手指动画的参数
      imageSrc: "https://www.zebbagreen.cn/static/手指.svg",
      animationData: {},
      isDisabled: false,
      //创作文字动画
      textAnimation: null,
      //小窗口动画参数
      // 小窗的参数
      showPopup: true,
      inputText: "",
      selectedText: "",
      chooseAnimation: null,
      overAnimation: null,
      examinationTypeArray: [
        "海胆Sea Urchin",
        "海星Starfish",
        "螃蟹Crab",
        "鲸鱼Whale",
        "海豚Dolphin",
        "水母Jellyfish"
      ],
      examinationTypeArrayTrans: [
        "sea ​​urchin",
        "starfish",
        "Crab",
        "whale",
        "dolphin",
        "jellyfish"
      ],
      examinationTypeIndex: 0,
      examinationTypeArrayType: "换主题/CHANGE THEME",
      examinationTypeArrayTransType: "Marine Life",
      prompt: "",
      firstthemeicon: "",
      username: "",
      firstthemeiconCHINA: "",
      //
      showpp: true,
      canvasVisible: false
    };
  },
  onLoad(option) {
    this.prompt = option.prompt;
    this.firstthemeicon = option.firstthemeicon;
    this.firstthemeiconCHINA = option.firstthemeiconCHINA;
  },
  methods: {
    //解决苹果手机不能输入的问题
    enableInput() {
      const inputElement = event.target.querySelector("input");
      inputElement.focus();
    },
    close1() {
      if (this.showpp == true) {
        this.showpp = !this.showpp;
        this.toggleWindow();
        console.log(this.firstthemeicon);
        common_vendor.index.loadFontFace({
          family: "hh",
          source: `url("${url}")`
        }), common_vendor.index.createSelectorQuery().select(".canvas-element").boundingClientRect((res) => {
          this.canvasWidth = res.width;
          this.canvasHeight = res.height;
          this.canvasContext = common_vendor.index.createCanvasContext("canvas", this);
          this.draw();
        }).exec();
      }
    },
    //手指动画
    //限定字数
    limitInput(event2) {
      if (this.inputText.length > 5) {
        this.inputText = this.inputText.slice(0, 4);
      }
      this.inputText = event2.target.value;
    },
    Inputname(event2) {
      this.username = event2.target.value;
    },
    //小窗的方法
    toggleWindow0() {
      this.canvasVisible = false;
      const animationOVERin = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animationOVERin.translate("0rpx").step({
        duration: 100
      }).opacity(1).step({
        duration: 1e3
      });
      this.overAnimation = animationOVERin.export();
      const animationCHO = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animationCHO.translate("-280rpx", "-150rpx").opacity(1).step({
        duration: 200
      }).step({
        duration: 1e3
      });
      this.chooseAnimation = animationCHO.export();
    },
    //确定之后的方法
    toggleWindow() {
      this.canvasVisible = true;
      const animationOVER = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animationOVER.translate("-750rpx").step({
        duration: 10
      }).opacity(0).step({
        duration: 50
      });
      this.overAnimation = animationOVER.export();
      const animationCHO = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animationCHO.translate("-950rpx", "950rpx").opacity(0).step({
        duration: 400
      }).step({
        duration: 1e3
      });
      this.chooseAnimation = animationCHO.export();
      const animation = common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
      });
      animation.opacity(1).rotate(-45).step().opacity(1).rotate(0).step({
        duration: 300
      }).opacity(0).translate("-100%", "-100%").step();
      this.animationData = animation.export();
      setTimeout(() => {
        const animationtxt = common_vendor.index.createAnimation({
          duration: 1e3,
          timingFunction: "ease"
        });
        animationtxt.opacity(0).translateX("-100%").step();
        this.textAnimation = animationtxt.export();
      }, 1e3);
    },
    selectText(text) {
      this.selectedText = text;
    },
    //下拉选择框
    examinationType(e) {
      this.examinationTypeIndex = e.target.value;
      this.examinationTypeArrayType = this.examinationTypeArray[this.examinationTypeIndex];
      this.examinationTypeArrayTransType = this.examinationTypeArrayTrans[this.examinationTypeIndex];
      this.prompt = this.examinationTypeArrayTransType;
    },
    getImageSource(type) {
      switch (type) {
        case "海胆Sea Urchin":
          return "https://www.zebbagreen.cn/static/海胆icon.svg";
        case "海星Starfish":
          return "https://www.zebbagreen.cn/static/海星icon.svg";
        case "螃蟹Crab":
          return "https://www.zebbagreen.cn/static/螃蟹icon.svg";
        case "鲸鱼Whale":
          return "https://www.zebbagreen.cn/static/鲸鱼icon.svg";
        case "海豚Dolphin":
          return "https://www.zebbagreen.cn/static/海豚icon.svg";
        case "水母Jellyfish":
          return "https://www.zebbagreen.cn/static/水母icon.svg";
        default:
          return "";
      }
    },
    //绘制部分
    canvasStart(event2) {
      this.isDrawing = true;
      const {
        x,
        y
      } = event2.touches[0];
      const newPath = {
        type: "start",
        points: [{
          x,
          y
        }]
      };
      this.currentPath.push(newPath);
      this.draw();
    },
    canvasMove(event2) {
      if (!this.isDrawing)
        return;
      const {
        x,
        y
      } = event2.touches[0];
      if (this.currentPath.length > 0) {
        const currentPath = this.currentPath[this.currentPath.length - 1];
        currentPath.points.push({
          x,
          y
        });
      }
      if (!this.animationFrameID) {
        this.animationFrameID = setTimeout(() => {
          this.animationFrameID = null;
          this.draw();
        }, 16);
      }
    },
    canvasEnd() {
      this.isDrawing = false;
    },
    draw() {
      const ctx = this.canvasContext;
      if (!ctx)
        return;
      const paths = this.currentPath;
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.setStrokeStyle("#000000");
      ctx.setLineWidth(4);
      ctx.setLineCap("round");
      ctx.setLineJoin("round");
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const points = path.points;
        if (points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let j = 1; j < points.length; j++) {
            ctx.lineTo(points[j].x, points[j].y);
          }
          ctx.stroke();
        }
      }
      ctx.draw();
    },
    emptycanvas() {
      const ctx = this.canvasContext;
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.currentPath = [];
      ctx.draw();
    },
    showWaitingDialog() {
      common_vendor.index.showLoading({
        title: "Wait...",
        mask: true
        // 遮罩层，禁止用户进行其他操作
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.navigateTo({
          url: "card?generatedImage=" + this.generatedImage + "&inputText=" + this.inputText + "&attributes=" + this.examinationTypeArrayType + "&username=" + this.username + "&firstthemeiconCHINA=" + this.firstthemeiconCHINA
        });
      }, 3e3);
    },
    convertAndSendImage() {
      this.showWaitingDialog();
      console.log(this.prompt);
      common_vendor.index.createSelectorQuery().select(".canvas-element").node((res) => {
        res.node;
        common_vendor.index.canvasToTempFilePath({
          canvasId: "canvas",
          success: (res2) => {
            common_vendor.index.getFileSystemManager().readFile({
              filePath: res2.tempFilePath,
              encoding: "base64",
              success: (data) => {
                const base64Image = data.data;
                this.base64Image = "data:image/jpeg;base64," + base64Image;
                this.imageFile = null;
                this.sendImage2();
              },
              fail: (error) => {
                console.log(error);
              }
            });
          },
          fail: (error) => {
            console.log(error);
          }
        });
      }).exec();
    },
    // Method to send the converted image
    sendImage() {
      const url2 = "https://gt29495501.yicp.fun/sdapi/v1/txt2img";
      const params = {
        prompt: "A flat image of ip, logo or a symbol, it is" + this.prompt,
        negative_prompt: "(worst quality,low quality,bad quality),",
        enable_hr: "false",
        seed: -1,
        sampler_name: "Euler a",
        batch_size: 1,
        steps: 20,
        quick_steps: 12,
        cfg_scale: 7,
        width: 512,
        height: 512,
        override_settings_restore_afterwards: "true",
        hr_second_pass_steps: 9,
        hr_scale: 1,
        hr_upscaler: "Latent (bicubic)",
        denoising_strength: 0.6,
        denoising_strength: 0.6,
        sampler_name: "DPM++ 2M Karras",
        alwayson_scripts: {
          controlnet: {
            args: [{
              weight: 1.2,
              guidance_start: 0,
              guidance_end: 1,
              module: "invert",
              pixel_perfect: false,
              model: ["control_v11p_sd15_canny"],
              input_image: this.base64Image
            }]
          }
        }
        // Add any other required parameters
        // key: value
      };
      common_vendor.index.request({
        url: url2,
        method: "POST",
        // header: {
        //   'Content-Type': 'application/json', // Set the media type of the request body to JSON
        //   'Authorization': 'Bearer your_token_here' // Add authentication token if required
        // },
        data: JSON.stringify(params),
        success: (response) => {
          const responseData = response.data;
          console.log(response.data);
          const imageBase64 = responseData.images[0];
          const imageUrl = "data:image/png;base64," + imageBase64;
          this.generatedImage = imageUrl;
        },
        fail: (error) => {
          console.error("Error:", error);
        }
      });
    },
    sendImage2() {
      const url2 = "https://gt29495501.yicp.fun/sdapi/v1/img2img";
      const params = {
        init_images: [this.base64Image],
        prompt: "1sea life with " + this.prompt + " elements,Flat style, no shadows ,front view,in the center of the screen,Flat illustration,UI Illusitration,GUI,Minimalism，White background, colorful scheme, no humans,it iS,8k,",
        negative_prompt: "(worst quality,low quality,bad quality，extra border),",
        enable_hr: "false",
        seed: -1,
        sampler_name: "Euler a",
        batch_size: 1,
        steps: 30,
        quick_steps: 12,
        cfg_scale: 7,
        width: 512,
        height: 512,
        override_settings_restore_afterwards: "true",
        denoising_strength: 0.62,
        sampler_name: "DPM++ 2M Karras"
        // Add any other required parameters
        // key: value
      };
      common_vendor.index.request({
        url: url2,
        method: "POST",
        // header: {
        //   'Content-Type': 'application/json', // Set the media type of the request body to JSON
        //   'Authorization': 'Bearer your_token_here' // Add authentication token if required
        // },
        data: JSON.stringify(params),
        success: (response) => {
          const responseData = response.data;
          console.log(response.data);
          const imageBase64 = responseData.images[0];
          const imageUrl = "data:image/png;base64," + imageBase64;
          this.generatedImage = imageUrl;
        },
        fail: (error) => {
          console.error("Error:", error);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.canvasVisible,
    b: common_vendor.o((...args) => $options.canvasStart && $options.canvasStart(...args)),
    c: common_vendor.o((...args) => $options.canvasMove && $options.canvasMove(...args)),
    d: common_vendor.o((...args) => $options.canvasEnd && $options.canvasEnd(...args)),
    e: !$data.isDisabled
  }, !$data.isDisabled ? {
    f: $data.imageSrc,
    g: $data.animationData
  } : {}, {
    h: $data.textAnimation,
    i: $options.getImageSource($data.examinationTypeArrayType) || $data.firstthemeicon,
    j: common_vendor.o((...args) => $options.toggleWindow0 && $options.toggleWindow0(...args)),
    k: common_vendor.o((...args) => $options.emptycanvas && $options.emptycanvas(...args)),
    l: common_vendor.o((...args) => $options.convertAndSendImage && $options.convertAndSendImage(...args)),
    m: $data.showPopup,
    n: $data.overAnimation,
    o: common_vendor.o((...args) => $options.limitInput && $options.limitInput(...args)),
    p: common_vendor.t($data.examinationTypeArrayType),
    q: common_vendor.o((...args) => $options.examinationType && $options.examinationType(...args)),
    r: $data.examinationTypeArray,
    s: common_vendor.o((...args) => $options.toggleWindow && $options.toggleWindow(...args)),
    t: $data.showPopup,
    v: $data.chooseAnimation,
    w: $data.showpp,
    x: common_vendor.o((...args) => $options.Inputname && $options.Inputname(...args)),
    y: common_vendor.o((...args) => $options.enableInput && $options.enableInput(...args)),
    z: common_vendor.o((...args) => $options.limitInput && $options.limitInput(...args)),
    A: common_vendor.o((...args) => $options.enableInput && $options.enableInput(...args)),
    B: common_vendor.o((...args) => $options.close1 && $options.close1(...args)),
    C: $data.showpp
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/湖滨街道小程序开发/hubinPING/pages/english/draw.vue"]]);
wx.createPage(MiniProgramPage);
