<template>
  <view class="content">
    <!-- 画板区域 -->
    <view class="draw-area">
      <canvas class="canvas-element" canvas-id="canvas" v-show="canvasVisible" style="z-index:0; "
        @touchstart="canvasStart" @touchmove="canvasMove" @touchend="canvasEnd"></canvas>
    </view>

    <!-- 动画区域 -->
    <image v-if="!isDisabled" class="icon" :src="imageSrc" style="position: absolute;;width: 80%;
            height: 80%; z-index: 2;" :animation="animationData" />
    <!-- <image class="icon" src="/static/绘画线.svg" style="position: absolute;;width: 80%;
            height: 80%; " /> -->
    <text class=" " style="position: absolute; font-family: 'hh'; font-weight: 100; font-size: 108rpx;top: 300rpx;"
      :animation="textAnimation">Now painting！</text>

    <!-- 上传区域 -->
    <view>
      <view class="Switch" style="display: flex;flex-direction: column-reverse;align-items: center;z-index: 3;">
        <div class="text1" style="margin-top: 15rpx;">Switch theme</div>
        <button class="switchbutton1" @click="toggleWindow0"
          style="display: flex; align-items: center;justify-content: space-between;font-size:72rpx;">
          <image class="icon" src="https://www.zebbagreen.cn/static/切换.svg"
            style="width: 60rpx; height: 60rpx; left: 10rpx ;transform: rotate(90deg);" />
          |
          <image class="icon" :src="getImageSource(examinationTypeArrayType) || firstthemeicon"
            style=" width: 80rpx; height: 80rpx; right: 10rpx;" />

        </button>
      </view>

      <view class="CLEAR" style="display: flex;flex-direction: column-reverse;align-items: center; z-index: 3;">
        <div class="text2" style="margin-top: 15rpx;">Clear</div>
        <button class="clear-canvas" @tap="emptycanvas" style="display: flex;align-items: center;">
          <image class="icon" src="https://www.zebbagreen.cn/static/清空.svg" style="position: relative;width: 80rpx; 
  height: 80rpx; " />
        </button>
      </view>

      <view class="GENERATE" style="display: flex;flex-direction: column-reverse;align-items: center; z-index: 3;">
        <div class="text3" style="margin-top: 15rpx;">Generate</div>
        <button class="upload-button" @tap="convertAndSendImage" style="display: flex;align-items: center;">
          <image class="icon" src="https://www.zebbagreen.cn/static/对勾.svg" style="position: relative;;width: 80rpx; 
  height: 80rpx; " />
        </button>
      </view>
    </view>

    <!-- 小窗口 -->
    <view class="choose" style="position: absolute;top: 1000rpx;">
      <div v-show="showPopup" class="overlay" :animation="overAnimation"></div>
      <view v-show="showPopup" class="popup-container" :animation="chooseAnimation">
        <!-- 文字输入框 -->
        <button class="name"><input class="inputText" placeholder="换名字/CHANGE NAME" @input="limitInput"
            maxlength="5" /></button>
        <!-- 文字选择容器 -->
        <picker class="picker-container" @change="examinationType" :range="examinationTypeArray">
          <button class="picker-value">{{ examinationTypeArrayType }}</button>
        </picker>
        <button class="yes-value" @click="toggleWindow">确定</button>
      </view>
    </view>

    <!-- 小窗口2 -->
    <view class="choose1" style="position: absolute;top: 1000rpx; z-index: 9999 ; ">
      <div v-show="showpp" class="overlay"></div>
      <view v-show="showpp" class="popup-container">
        <!-- 文字输入框 -->
        <button class="name" @touchstart="enableInput">
          <input class="username" placeholder="YOUR NAME" @input="Inputname" maxlength="5" />
        </button>
        <button class="name" @touchstart="enableInput">
          <input class="inputText" placeholder="NAME YOUR ELF!" @input="limitInput" maxlength="5" />
        </button>

        <button class="yes-value" @click="close1">YES</button>
      </view>
    </view>



  </view>
</template>

<script>
  const url = 'https://www.zebbagreen.cn/FZLTSJW.TTF'


  export default {
    data() {
      return {
        canvasContext: null,
        isDrawing: false,
        inputValue: '',
        currentPath: [],
        animationFrameID: null,
        imageFile: null,
        uploadedImage: null,
        generatedImage: null,
        base64Image: '',

        //手指动画的参数
        imageSrc: 'https://www.zebbagreen.cn/static/手指.svg',
        animationData: {},
        isDisabled: false,
        //创作文字动画
        textAnimation: null,

        //小窗口动画参数
        // 小窗的参数
        showPopup: true,
        inputText: '',
        selectedText: '',
        chooseAnimation: null,
        overAnimation: null,

        examinationTypeArray: ['海胆Sea Urchin', '海星Starfish', '螃蟹Crab',
          '鲸鱼Whale', '海豚Dolphin', '水母Jellyfish',
        ],
        examinationTypeArrayTrans: ['sea ​​urchin', 'starfish', 'Crab',
          'whale', 'dolphin', 'jellyfish',
        ],
        examinationTypeIndex: 0,
        examinationTypeArrayType: '换主题/CHANGE THEME',
        examinationTypeArrayTransType: 'Marine Life',

        prompt: '',
        firstthemeicon: '',
        username: '',

        firstthemeiconCHINA: '',

        //
        showpp: true,

        canvasVisible: false

      }
    },

    onLoad(option) {
      //手指动画
      // this.toggleWindow()


      this.prompt = option.prompt
      this.firstthemeicon = option.firstthemeicon;
      this.firstthemeiconCHINA = option.firstthemeiconCHINA


    },


    methods: {
      //解决苹果手机不能输入的问题
      enableInput() {
        const inputElement = event.target.querySelector('input');
        inputElement.focus();
      },

      close1() {
        if (this.showpp == true) {
          this.showpp = !this.showpp
          this.toggleWindow()

          console.log(this.firstthemeicon)
          uni.loadFontFace({
              family: 'hh',
              source: `url("${url}")`
            }),
            uni.createSelectorQuery()
            .select('.canvas-element')
            .boundingClientRect((res) => {
              this.canvasWidth = res.width;
              this.canvasHeight = res.height;
              this.canvasContext = uni.createCanvasContext('canvas', this);
              this.draw(); // 调用绘制方法
            })
            .exec();
        }
      },
      //手指动画



      //限定字数
      limitInput(event) {
        if (this.inputText.length > 5) {
          this.inputText = this.inputText.slice(0, 4);
        }
        this.inputText = event.target.value;
      },

      Inputname(event) {

        this.username = event.target.value;
      },


      //小窗的方法
      toggleWindow0() {
        this.canvasVisible = false;
        //over的淡入
        //over的淡出
        const animationOVERin = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animationOVERin
          .translate('0rpx')
          .step({
            duration: 100
          })
          .opacity(1)
          .step({
            duration: 1000
          })
        this.overAnimation = animationOVERin.export();

        //小窗移入
        const animationCHO = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animationCHO
          .translate('-280rpx', '-150rpx')
          .opacity(1)
          .step({
            duration: 200
          })
          .step({
            duration: 1000
          });
        this.chooseAnimation = animationCHO.export();

        //this.animatePopup();
        // this.showPopup = true;

      },

      //确定之后的方法
      toggleWindow() {
        this.canvasVisible = true;
        //over的淡出
        const animationOVER = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animationOVER
          .translate('-750rpx')
          .step({
            duration: 10
          })
          .opacity(0)
          .step({
            duration: 50
          })
        this.overAnimation = animationOVER.export();

        //淡出动画
        const animationCHO = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animationCHO
          .translate('-950rpx', '950rpx')
          .opacity(0)
          .step({
            duration: 400
          })



          // 移动到左下角位置，即屏幕外
          .step({
            duration: 1000
          });
        this.chooseAnimation = animationCHO.export();

        //手指动画
        const animation = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animation
          .opacity(1)
          .rotate(-45)
          .step()
          .opacity(1)
          .rotate(0)
          .step({
            duration: 300
          })
          .opacity(0)
          .translate('-100%', '-100%') // 移动到左上角位置，即屏幕外
          .step();
        this.animationData = animation.export();
        //文字动画
        setTimeout(() => {
          const animationtxt = uni.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
          });
          animationtxt.opacity(0).translateX('-100%').step();

          this.textAnimation = animationtxt.export();
        }, 1000);

      },


      selectText(text) {
        this.selectedText = text;
      },


      //下拉选择框
      examinationType(e) {
        this.examinationTypeIndex = e.target.value;
        this.examinationTypeArrayType = this.examinationTypeArray[this.examinationTypeIndex]
        this.examinationTypeArrayTransType = this.examinationTypeArrayTrans[this.examinationTypeIndex]
        this.prompt = this.examinationTypeArrayTransType;
      },
      getImageSource(type) {
        // 根据 examinationTypeArrayType 获取对应的图片路径
        switch (type) {
          // case '选择你的创作主题':
          //   return '/static/不知道icon.svg';
          case '海胆Sea Urchin':
            return 'https://www.zebbagreen.cn/static/海胆icon.svg';
          case '海星Starfish':
            return 'https://www.zebbagreen.cn/static/海星icon.svg';
          case '螃蟹Crab':
            return 'https://www.zebbagreen.cn/static/螃蟹icon.svg';
          case '鲸鱼Whale':
            return 'https://www.zebbagreen.cn/static/鲸鱼icon.svg';
          case '海豚Dolphin':
            return 'https://www.zebbagreen.cn/static/海豚icon.svg';
          case '水母Jellyfish':
            return 'https://www.zebbagreen.cn/static/水母icon.svg';
          default:
            return '';
        }
      },


      //绘制部分
      canvasStart(event) {
        this.isDrawing = true;
        const {
          x,
          y
        } = event.touches[0];
        const newPath = {
          type: 'start',
          points: [{
            x,
            y
          }]
        };
        this.currentPath.push(newPath);
        this.draw();
      },
      canvasMove(event) {
        if (!this.isDrawing) return;
        const {
          x,
          y
        } = event.touches[0];
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
          }, 16); // 使用约16毫秒的延迟来模拟60帧每秒的效果
        }
      },
      canvasEnd() {
        this.isDrawing = false;
      },
      draw() {
        const ctx = this.canvasContext;
        if (!ctx) return; // 避免在canvasContext为空时执行绘制操作
        const paths = this.currentPath;
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.setStrokeStyle('#000000');
        ctx.setLineWidth(4);
        ctx.setLineCap('round');
        ctx.setLineJoin('round');
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
        this.currentPath = []; // 清空绘制路径
        ctx.draw();
      },

      showWaitingDialog() {
        // 禁用其他页面功能
        uni.showLoading({
          title: 'Wait...',
          mask: true // 遮罩层，禁止用户进行其他操作
        });

        // 延迟3秒后关闭等待弹窗并恢复其他页面功能
        setTimeout(() => {
          uni.hideLoading(); // 关闭等待弹窗
          uni.navigateTo({
            url: 'card?generatedImage=' + this.generatedImage + '&inputText=' + this.inputText +
              '&attributes=' + this.examinationTypeArrayType + '&username=' + this.username +
              '&firstthemeiconCHINA=' + this.firstthemeiconCHINA,
          });
          // 恢复其他页面功能
          // ...
        }, 3000);
        // console.log(this.firstthemeiconCHINA)



      },



      convertAndSendImage() {
        this.showWaitingDialog();
        console.log(this.prompt)
        uni.createSelectorQuery()
          .select('.canvas-element')
          .node((res) => {
            const canvas = res.node;
            uni.canvasToTempFilePath({
              canvasId: 'canvas',
              success: (res) => {
                uni.getFileSystemManager().readFile({
                  filePath: res.tempFilePath,
                  encoding: 'base64',
                  success: (data) => {
                    const base64Image = data.data;
                    this.base64Image = 'data:image/jpeg;base64,' + base64Image;
                    this.imageFile = null; // Set the image file path to null
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
          })
          .exec();
      },

      // Method to send the converted image
      sendImage() {
        const url = 'https://gt29495501.yicp.fun/sdapi/v1/txt2img'; // Replace with your server address

        const params = {
          prompt: 'A flat image of ip, logo or a symbol, it is' + this.prompt,
          negative_prompt: '(worst quality,low quality,bad quality),',
          enable_hr: "false",
          seed: -1,
          sampler_name: 'Euler a',
          batch_size: 1,
          steps: 20,
          quick_steps: 12,
          cfg_scale: 7,
          width: 512,
          height: 512,
          override_settings_restore_afterwards: 'true',
          hr_second_pass_steps: 9,
          hr_scale: 1.0,
          hr_upscaler: 'Latent (bicubic)',
          denoising_strength: 0.6,
          denoising_strength: 0.6,
          sampler_name: 'DPM++ 2M Karras',

          alwayson_scripts: {
            controlnet: {
              args: [{
                weight: 1.2,
                guidance_start: 0.0,
                guidance_end: 1.0,
                module: 'invert',
                pixel_perfect: false,
                model: ['control_v11p_sd15_canny'],
                input_image: this.base64Image,
              }],
            },
          },
          // Add any other required parameters
          // key: value
        };

        uni.request({
          url: url,
          method: 'POST',
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
        const url = 'https://gt29495501.yicp.fun/sdapi/v1/img2img'; // Replace with your server address

        const params = {
          init_images: [this.base64Image],
          prompt: '1sea life with ' + this.prompt +
            ' elements,Flat style, no shadows ,front view,in the center of the screen,Flat illustration,UI Illusitration,GUI,Minimalism，White background, colorful scheme, no humans,it iS,8k,',
          negative_prompt: '(worst quality,low quality,bad quality，extra border),',
          enable_hr: "false",
          seed: -1,
          sampler_name: 'Euler a',
          batch_size: 1,
          steps: 30,
          quick_steps: 12,
          cfg_scale: 7,
          width: 512,
          height: 512,
          override_settings_restore_afterwards: 'true',

          denoising_strength: 0.62,
          sampler_name: 'DPM++ 2M Karras',
          // Add any other required parameters
          // key: value
        };

        uni.request({
          url: url,
          method: 'POST',
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
    }
  };
</script>

<style>
  /*  @font-face {
    font-family: 'hh';
    src: url(data:application/font-ttf;charset=utf-8;base64,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aWMAAEYAbwBuAHQARgBvAHIAZwBlACAAMgAuADAAIAA6ACAAUwBvAHUAcgBjAGUASABhAG4AUwBlAHIAaQBmAEMATgAtAFIAZQBnAHUAbABhAHIALQBBAGwAcABoAGEAYgBlAHQAaQBjACAAOgAgADIANgAtADYALQAyADAAMgAzAABGb250Rm9yZ2UgMi4wIDogU291cmNlSGFuU2VyaWZDTi1SZWd1bGFyLUFscGhhYmV0aWMgOiAyNi02LTIwMjMAAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAAVmVyc2lvbiAxLjAAAFMAbwB1AHIAYwBlAEgAYQBuAFMAZQByAGkAZgBDAE4ALQBSAGUAZwB1AGwAYQByAC0AQQBsAHAAaABhAGIAZQB0AGkAYwAAU291cmNlSGFuU2VyaWZDTi1SZWd1bGFyLUFscGhhYmV0aWMAAAACAAAAAAAA/4MAMgAAAAAAAAAAAAAAAAAAAAAAAAAAADcAAAABAAIBAgEDAQQBBQEGAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMBFAEVARYBFwEYARkBGgEbARwBHQEeAR8BIAEhASIBIwEkASUBJgEnASgBKQEqASsBLAEtAS4BLwEwATEBMgEzATQBNQ5JZGVudGl0eS41OTk3Ng5JZGVudGl0eS41OTk3Nw5JZGVudGl0eS41OTk3OA5JZGVudGl0eS41OTk3OQ5JZGVudGl0eS41OTk4MA5JZGVudGl0eS41OTk4MQ5JZGVudGl0eS41OTk4Mg5JZGVudGl0eS41OTk4Mw5JZGVudGl0eS41OTk4NA5JZGVudGl0eS41OTk4NQ5JZGVudGl0eS41OTk4Ng5JZGVudGl0eS41OTk4Nw5JZGVudGl0eS41OTk4OA5JZGVudGl0eS41OTk4OQ5JZGVudGl0eS41OTk5MA5JZGVudGl0eS41OTk5MQ5JZGVudGl0eS41OTk5Mg5JZGVudGl0eS41OTk5Mw5JZGVudGl0eS41OTk5NA5JZGVudGl0eS41OTk5NQ5JZGVudGl0eS41OTk5Ng5JZGVudGl0eS41OTk5Nw5JZGVudGl0eS41OTk5OA5JZGVudGl0eS41OTk5OQ5JZGVudGl0eS42MDAwMA5JZGVudGl0eS42MDAwMQ5JZGVudGl0eS42MDAwOA5JZGVudGl0eS42MDAwOQ5JZGVudGl0eS42MDAxMA5JZGVudGl0eS42MDAxMQ5JZGVudGl0eS42MDAxMg5JZGVudGl0eS42MDAxMw5JZGVudGl0eS42MDAxNA5JZGVudGl0eS42MDAxNQ5JZGVudGl0eS42MDAxNg5JZGVudGl0eS42MDAxNw5JZGVudGl0eS42MDAxOA5JZGVudGl0eS42MDAxOQ5JZGVudGl0eS42MDAyMA5JZGVudGl0eS42MDAyMQ5JZGVudGl0eS42MDAyMg5JZGVudGl0eS42MDAyMw5JZGVudGl0eS42MDAyNA5JZGVudGl0eS42MDAyNQ5JZGVudGl0eS42MDAyNg5JZGVudGl0eS42MDAyNw5JZGVudGl0eS42MDAyOA5JZGVudGl0eS42MDAyOQ5JZGVudGl0eS42MDAzMA5JZGVudGl0eS42MDAzMQ5JZGVudGl0eS42MDAzMg5JZGVudGl0eS42MDAzMwAAAAH//wACAAAAAQAAAADV7UW4AAAAAOC/N1MAAAAA4L83UwABEAACAP4PAFoD6P7qAKMDRQAAAAEAAAAAAAAAAAAAAAAABAPoApoAAAAAA+gAAAPoADQANAAjADQANAA0ACMANAA0ADQANAA0ADQANAAjADQAIwA0ACMANAA0ADQANAA0ADQANAD///EA///xAP//2wD///H/9//3//H/8QD/AP8A/wD/AP8A/wD/AGoBCgERAREBEQERAREAAA==) format('truetype');
  }
 */

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* font-family: "zt"; */
    font-weight: bold;
    font-family: 'hh';
  }

  .inputText::placeholder {
    font-size: 28rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10rpx;
    margin-top: 30rpx;


  }


  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400rpx;
    height: 75rpx;
    font-size: 28rpx;
    background-color: #3FE2EB;
    border: 1px solid #000;
    border-radius: 50px;
    text-align: center;
  }

  .input-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10rpx;
    border: 1px solid #000;


    /* Add black solid border */

  }


  /* 选择你的创作主题 */
  .picker-value {
    display: flex;
    align-items: center;
    justify-content: center;
    /* 将内容水平居中 */
    width: 400rpx;
    height: 75rpx;
    font-size: 28rpx;
    background-color: #3FE2EB;
    border: 1px solid #000;
    border-radius: 50px;
    text-align: center;
  }

  .yes-value {
    display: flex;
    align-items: center;
    justify-content: center;
    /* 将内容水平居中 */
    /* top: 60rpx; */
    width: 200rpx;
    height: 75rpx;
    font-size: 28rpx;
    background-color: #d3d3d3;
    border: 1px solid #000;
    border-radius: 50px;
    text-align: center;
    top: 25rpx;
  }




  .draw-area {
    margin: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }



  .doCanvas {
    position: fixed;
    top: 90vh;
    left: 20rpx;
    width: 94.5vw;
    display: flex;
    justify-content: space-between;
    z-index: 999;
  }




  .uploaded-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 1px solid #000;
    /* Add black solid border */
    border-radius: 0px;
    /* Remove border radius */
  }

  .canvas-element {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 10px 10px;
    border: none;
  }




  .popup-container {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75vw;
    height: 27vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    border-radius: 10px;
    border: 0px solid #000;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);
    /* Add black solid border */
    text-align: center;


  }

  .popup-container .doCanvas {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .popup-container button {
    margin-top: 20rpx;
    align-self: center;
    z-index: 9999;
  }


  .text-container {
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;
    z-index: 9999;
  }


  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1.65px);
    /* Adjust the blur amount as desired */
    z-index: 9990;
  }

  /* 第一页的三个按钮的样式 */

  .Switch {
    position: absolute;
    top: 1250rpx;
    left: 60rpx;
  }

  .switchbutton1 {
    width: 250rpx;
    height: 100rpx;
    line-height: 80rpx;
    padding: 0 30rpx;
    font-size: 28rpx;
    background-color: #3FE2EB;
    color: #000;
    border: none;
    text-align: center;
    border: 1.5px solid #000;
    /* Add black solid border */
    border-radius: 50px;
    /* Remove border radius */
  }

  .text1 {
    font-size: 35rpx;
    color: #000;
  }

  .CLEAR {
    position: absolute;
    top: 1250rpx;
    right: 180rpx;
  }

  .clear-canvas {
    width: 100rpx;
    height: 100rpx;
    line-height: 80rpx;
    padding: 0 30rpx;
    font-size: 28rpx;
    background-color: #3FE2EB;
    color: #000;
    border: 1.5px solid #000;
    border-radius: 50px;
  }

  .text3 {
    font-size: 30rpx;
    color: #000;
  }

  .GENERATE {
    position: absolute;
    top: 1250rpx;
    right: 60rpx;
  }

  .upload-button {
    width: 100rpx;
    height: 100rpx;
    line-height: 80rpx;
    padding: 0 30rpx;
    font-size: 28rpx;
    background-color: #3FE2EB;
    color: #000;
    border: 1.5px solid #000;
    border-radius: 50px;
  }

  .text2 {
    font-size: 32rpx;
    color: #000;
  }

  /* 按钮 hover 样式 */
  .upload-button:active,
  .clear-canvas:active,
  .switchbutton1:active,
  .switchbutton2:active {
    background-color: #D2396A;
    color: white;
    border: 0px solid #000;
    /* Add black solid border */

    /* Remove border radius */
  }
</style>