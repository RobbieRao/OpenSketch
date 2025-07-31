<template>

  <view class="circle"
    style="position: absolute;top: 150rpx;right: 150rpx; border-radius: 100%; width: 100rpx; height: 100rpx;background-color:rgba(255, 191, 209, 1.0) ; box-shadow: 0 0 50rpx 200rpx rgba(255, 191, 209, 1.0);"
    :animation='changecolor'>
  </view>
  <view class="circle"
    style="position: absolute;top: 650rpx;left: 150rpx; border-radius: 100%;  width: 100rpx; height: 100rpx;background-color:rgba(186, 224, 255, 1.0); box-shadow: 0 0 50rpx 300rpx rgba(186, 224, 255, 1.0);"
    :animation='changecolor'>
  </view>
  <view class="circle"
    style="position: absolute;top: 1050rpx;right: 150rpx; border-radius: 100%;width: 100rpx; height: 100rpx; background-color:rgba(255, 191, 209, 1.0) ; box-shadow: 0 0 50rpx 200rpx rgba(255, 191, 209, 1.0);"
    :animation='changecolor'>
  </view>


  <!-- 抬头文字 -->
  <view class="content" style=" position:relative; ">


    <view class="header"
      style="display: flex;flex-direction: column;align-items: left;width: 650rpx;height:280rpx;margin-top: 20rpx;margin-bottom: 25rpx; ">
      <text class="floating-text" style="font-family: 'ht'; font-size: 120rpx; line-height: 160rpx;">
        {{ inputText ? inputText : '泳动小精灵' }}
      </text>
      <text class="floating-text" style="font-family: 'ht';font-size: 36rpx; line-height: 50rpx;">Swiming sprite</text>
      <text class="floating-text" style="font-family: 'ht';font-size: 36rpx;line-height: 50rpx;">@！亚运会</text>
    </view>

    <!-- 图片产生区域 -->
    <view class=" background" style="display: flex;flex-direction: column; align-items: center; ">
      <view class="image-area">
        <image v-if="generatedImage" :src="generatedImage" alt="生成的图" class="uploaded-image"></image>
      </view>
    </view>

    <!-- 姓名卡 -->
    <view class="name-card"
      style=" display: flex; width: 600rpx; height: 200rpx;margin-top: 80rpx; border: 1.5px solid #000;justify-content: space-between;">

      <view class="number" style="diplay:flex; flex-direction: column;align-items: center;  margin-top: 0rpx;">
        <text class="number" style="color: #000000;font-size: 75rpx;margin: 15rpx;font-weight: 100;">NO.</text>
        <b></b>
        <text class="number"
          style="background-color: #ffffff;color: #000000;font-size: 72rpx;margin: 15rpx;letter-spacing: 7rpx;">{{ randomNumber }}</text>
      </view>

      <view class="" style="position: relative; text-align: right;">
        <text class="number"
          style="font-size: 36rpx;margin: 15rpx; font-weight: 100;  letter-spacing: 15rpx;">{{username}}的</text>
        <b></b>
        <text class="number"
          style=" background-color: #ff007f;color: #ffffff; font-size: 72rpx;margin: 15rpx;letter-spacing: 8rpx;">{{ inputText ? inputText : '泳动小精灵' }}</text>
        <b></b>
        <text class="number" style="font-size: 24rpx;margin: 15rpx;">属性:</text>
        <text class="number" style="font-size: 24rpx;margin: 15rpx;">{{attributes ? attributes : '未知' }}</text>
        <text class="number" style="font-size: 24rpx; margin: 15rpx; font-weight: 100;">{{ currentDate }}</text>
      </view>

    </view>

    <view class="share" style="display: flex;flex-direction: column-reverse;align-items: center">
      <button class="image-upload-button" @click="onShareButtonClick" style="display: flex;align-items: center;">
        <image class="icon" src="https://www.zebbagreen.cn/static/分享.svg" style="position: relative;;width: 160rpx; 
    height: 160rpx; " />
      </button>
    </view>

    <!-- 自由文字 -->
    <text
      style="position: absolute;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-weight: 100;font-size: 32rpx;writing-mode: vertical-lr;text-orientation: upright;right: 10rpx">与AI共创，生成你的泳动小精灵！</text>
    <text
      style="position: absolute;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-weight: 100;font-size: 32rpx;writing-mode: vertical-lr;text-orientation: upright;left: 10rpx;top: 900rpx;">心心相融，@未来！</text>

    <!-- 滑条 -->
    <view class="slider" style="position: absolute;right: 60rpx;top: 1250rpx;">


      <!-- 背景 -->
      <view class="sliderB"
        style="display: flex;flex-direction: row; align-items: center; width: 400rpx; height: 100rpx;border-radius: 60rpx; border: 1.5px solid #000;background-color: #ffffff;">
        <text
          style="position: absolute;right: 100rpx; font-family: 'hh';writing-mode:sideways-lr; text-orientation:sideways;color:#aeaeae;">右滑发射小精灵</text>
        <!-- 进度条 -->
        <view class="sliderback" :style="sliderStyle">
        </view>

        <!-- 滑块 -->
        <button class="image-upload-button" style="right: 150rpx;"
          :style="[buttonStyle, { 'pointer-events': uploadCount === 0 ? 'none' : 'auto' }]" @touchstart="onTouchStart"
          @touchmove="onTouchMove" @touchend="onTouchEnd"></button>
        <!-- icon -->
        <image class="icon" src="https://www.zebbagreen.cn/static/上传.svg" style="position: absolute;;width: 50rpx;
        height: 50rpx;margin-left: 320rpx;" />
      </view>

    </view>

  </view>
</template>

<script>
  const url = 'https://www.zebbagreen.cn/SourceHanSansCN-Heavy.ttf'
  const url2 = 'https://www.zebbagreen.cn/FZLTSJW.TTF'
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
        uploadCount: 9999,
        disableUploadButton: false,
        inputText: '',

        touchStartX: 0, // 触摸起始位置
        buttonTranslateX: 0, // 平移距离初始值为 0
        maxTranslateX: 175, // 最大平移距离
        isUploaded: false, // 标记是否已经执行过 onUploadscreen()
        hasReachedMaxPosition: false, // 标记是否已经达到最大位置

        //姓名卡上的属性名
        attributes: '',
        //获取日期
        currentDate: '',

        //背景颜色动画
        changecolor: {},

        randomNumber: 0, // 保存随机数
        username: '',
        firstthemeiconCHINA: ''

      };
    },
    computed: {
      buttonStyle() {
        return {
          transform: `translateX(${this.buttonTranslateX}px)`, // 使用transform平移按钮
        };
      },
      sliderStyle() {
        const buttonTranslateX = this.buttonTranslateX; // 获取按钮的平移距离
        const sliderWidth = 98 + buttonTranslateX * 1.75; // 计算滑块的宽度

        return {
          position: 'absolute',
          width: `${sliderWidth}rpx`,
          height: '98rpx',
          borderRadius: '60rpx',
          border: '1.5px solid #000',
          backgroundColor: '#D2396A',
        };
      },

    },
    mounted() {
      this.getCurrentDate();
      this.generateRandomNumber(); // 在页面加载时生成随机数
    },
    onLoad(options) {
      this.generatedImage = options.generatedImage;
      this.inputText = options.inputText;
      this.username = options.username;
      this.firstthemeiconCHINA = options.firstthemeiconCHINA;


      this.attributes = this.firstthemeiconCHINA;

      if (options.attributes !== '换主题/CHANGE THEME') {
        this.attributes = options.attributes;
      }



      console.log(this.firstthemeiconCHINA); // 输出第二个参数
      uni.loadFontFace({
        family: 'ht',
        source: `url("${url}")`
      })

      // uni.loadFontFace({
      //   family: 'hh',
      //   source: `url("${url2}")`
      // })
      //背景颜色的动画
      const animation = uni.createAnimation({
        duration: 1000,
        timingFunction: 'linear'
      });

      const repeatAnimation = () => {
        animation.rotate(90).step().rotate(180).step();

        this.changecolor = animation.export(); // 导出动画实例

        setTimeout(() => {
          repeatAnimation(); // 递归调用自身实现循环
        }, 2000);
      };
      repeatAnimation(); // 开始执行动画循环
    },

    onShow() {

    },




    methods: {
      //随机数生成
      generateRandomNumber() {
        const min = 100; // 最小值（三位数的最小值为100）
        const max = 999; // 最大值（三位数的最大值为999）
        const random = Math.floor(Math.random() * (max - min + 1)) + min; // 生成随机数
        this.randomNumber = random.toString(); // 将随机数转为字符串，用于显示在文本中
      },

      //背景旋转动画
      startRotateAnimation() {
        const animation = uni.createAnimation({
          duration: 5000,
          timingFunction: 'linear'
        });

        const repeatAnimation = () => {
          animation.rotate(360).step().rotate(0).step();

          this.changecolor = animation.export(); // 导出动画实例

          setTimeout(() => {
            repeatAnimation(); // 递归调用自身实现循环
          }, 2000);
        };
        repeatAnimation(); // 开始执行动画循环
      },

      //获得日期方法
      getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        this.currentDate = `${year}.${month}.${day}`;
      },

      //分享小程序
      onShareButtonClick() {
        // 调用 uni.share 方法分享当前小程序
        uni.share({
            title: '分享标题',
            content: '分享内容',
            path: '/pages/draw/draw' // 当前页面的路径，可根据实际情况进行修改
          })
          .then(() => {
            // 分享成功的回调
            console.log('分享成功');
          })
          .catch((error) => {
            // 分享失败的回调
            console.log('分享失败', error);
          });
      },


      onTouchStart(event) {
        this.touchStartX = event.changedTouches[0].pageX; // 记录触摸起始位置
      },
        onTouchMove(event) {
          const touchX = event.changedTouches[0].pageX; // 当前触摸位置
          const distance = touchX - this.touchStartX; // 计算触摸移动距离
          // 限制平移距离在最大平移距离范围内
          this.buttonTranslateX = Math.max(0, Math.min(distance, this.maxTranslateX));
          if (!this.hasReachedMaxPosition && Math.abs(distance) >= this.maxTranslateX) {
            this.hasReachedMaxPosition = true; // 设置已经达到最大位置的标记
            this.onUploadscreen(); // 执行 onUploadscreen() 函数
          }
          if (this.hasReachedMaxPosition) {
            this.buttonTranslateX = 0; // 重置按钮的平移距离为零
          }
        },
      onTouchEnd() {
        if (this.hasReachedMaxPosition) {
          this.buttonTranslateX = 0; // 重置按钮的平移距离为零
          this.isUploaded = true; // 设置已执行过 onUploadscreen() 的标记
        } else {
          this.buttonTranslateX = 0; // 重置按钮的平移距离为零
          this.isUploaded = false; // 重置已执行过 onUploadscreen() 的标记
        }

        this.hasReachedMaxPosition = false; // 重置已达到最大位置的标记
      },



      upLoadWaiting() {
        // 禁用其他页面功能

        uni.showLoading({
          title: '发射中...',
          mask: true // 遮罩层，禁止用户进行其他操作
        });

        // 延迟3秒后关闭等待弹窗并显示剩余次数弹窗
        setTimeout(() => {
          uni.hideLoading(); // 关闭等待弹窗

          uni.showModal({
            title: '发射成功',
            content: `剩余次数(${this.uploadCount})`,
            showCancel: false, // 不显示取消按钮
            success: () => {
              // 弹窗关闭后的回调
              // 恢复其他功能
              // ...
            }
          });
        }, 3000);
      },

        onUploadscreen() {
          if (this.uploadCount > 0) {
            this.uploadCount--; // 增加调用次数计数
          }
          this.upLoadWaiting();
          const url = 'https://x5334j0832.goho.co/upload_image'; // 替换为你要上传图片的服务器地址

        const imageData = {
          image: this.generatedImage.split(',')[1] // 获取生成的图片的Base64数据部分
        };

        uni.request({
          url: url,
          method: 'POST',
          data: JSON.stringify(imageData),
          success: (response) => {
            console.log(response.data);
            // 处理成功响应的逻辑

          },
          fail: (error) => {
            console.error("Error:", error);
            // 处理失败响应的逻辑
          }
        });
          if (this.uploadCount === 0) {
            // 禁用函数
            this.onUploadscreen = () => {
              console.log('函数被禁用');
            };
          }
        }


    }
  };
</script>

<style>
  .number {
    font-family: 'hh';
  }

  .content {
    z-index: 900;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: bolder;
  }

  .header {
    font-weight: bolder;
    font-family: 'hh';
  }

  .image-upload-button {
    width: 100rpx;
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


  .image-upload-button:active {
    background-color: #D2396A;
    color: white;
    border: 1px solid #000;
    /* Add black solid border */
    border-radius: 50;
    /* Remove border radius */
  }

  .image-area {
    margin: 20rpx;
    width: 94.5vw;
    height: 94.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .doCanvas {
    display: flex;
    justify-content: space-between;
    margin: 10rpx;
  }

  .uploaded-image {
    width: 512rpx;
    height: 512rpx;
  }

  .canvas-element {
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
  }



  .background {
    width: 617rpx;
    height: 616rpx;
    background-image: linear-gradient(rgba(255, 41, 116, 1.0) 1px, transparent 1.5px),
      linear-gradient(90deg, rgba(255, 65, 157, 1.0) 1px, transparent 1.5px);
    background-size: 62rpx 62rpx;
  }

  .Slider {
    display: flex;
    flex-direction: column;
    justify-content: center;
    right: 10rpx;
    width: 400rpx;
    height: 100rpx;
    background-color: #ffffff;
    /* 设置滑条轨道的背景色 */
    border: 1px solid #000000;
    /* 设置滑条轨道的边框 */
    border-radius: 50px;
    /* 设置滑条轨道的圆角 */
  }

  /* 分享按钮 */
  .share {
    position: absolute;
    top: 1250rpx;
    left: 60rpx;
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff4f4;

  }

  .background0 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: radial-gradient(circle, #ffffff 13rpx, transparent 1rpx);
    background-size: 25rpx 25rpx;
  }
</style>