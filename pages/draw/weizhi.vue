<template>
  <view class="back"></view>
  <view class="background0"></view>

  <view class="circle"
    style="position: absolute;top: 150rpx;right: 150rpx; border-radius: 100%; width: 50rpx; height: 50rpx; background-color: white; box-shadow: 0 0 20rpx 200rpx rgba(255, 255, 255, 1.0);"
    :animation='changecolor'>
  </view>
  <view class="circle"
    style="position: absolute;top: 650rpx;left: 150rpx; border-radius: 100%;  width: 150rpx; height: 150rpx; background-color: white; box-shadow: 0 0 10rpx 300rpx rgba(255, 255, 255, 1.0);"
    :animation='changecolor'>
  </view>
  <view class="circle"
    style="position: absolute;top: 1150rpx;right: 60rpx; border-radius: 100%;  width: 35rpx; height: 30rpx; background-color: white; box-shadow: 0 0  10rpx 200rpx rgba(255, 255, 255, 1.0);"
    :animation='changecolor'>
  </view>


  <!-- 抬头文字 -->
  <view class="content" style=" position:relative; ">


    <view class="header"
      style="display: flex;flex-direction: column;align-items: left;width: 650rpx;height:280rpx;margin-top: 20rpx;margin-bottom: 35rpx; ">
      <text class="floating-text" style="font-family: 'ht'; font-size: 72rpx; ">
        哇！~~~~~~~~
      </text>
      <text class="floating-text" style="font-family: 'ht'; font-size: 120rpx; line-height: 160rpx;">
        你找到了！
      </text>
    </view>

    <!-- 图片产生区域 -->
    <view class=" background" style="display: flex;flex-direction: column; align-items: center; ">
      <view class="image-area">
        <image src="https://www.zebbagreen.cn/static/位置生物.svg" class="uploaded-image"></image>
      </view>
    </view>

    <!-- 姓名卡 -->
    <view class="name-card"
      style=" display: flex; width: 600rpx; height: 200rpx;margin-top: 80rpx; border: 1.5px solid #838383;justify-content: center;">
      <view class="number" style="diplay:flex; flex-direction: row;align-items: center;  margin-top: 70rpx; ">
        <text
          style=" position: relative; font-family: 'ht';font-size: 120rpx; line-height: 50rpx; text-align: center;">*未知生物*</text>
      </view>
    </view>

    <view class="GENERATE" style="display: flex;flex-direction: column-reverse;align-items: center; z-index: 3;">
      <div class="text3" style="  font-family: 'ht'; margin-top: 15rpx;">去画它!</div>
      <button class="upload-button" @tap="gotodraw" style="display: flex;align-items: center;">
        <image class="icon" src="https://www.zebbagreen.cn/static/箭头 右.svg" style="position: relative;;width: 80rpx; 
   height: 80rpx; " />
      </button>
    </view>

    <!-- 自由文字 -->
    <text
      style="position: absolute;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-weight: 100;font-size: 32rpx;writing-mode: vertical-lr;text-orientation: upright;right: 10rpx">与AI共创，生成你的泳动小精灵！</text>
    <text
      style="position: absolute;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-weight: 100;font-size: 32rpx;writing-mode: vertical-lr;text-orientation: upright;left: 10rpx;top: 900rpx;">心心相融，@未来！</text>


  </view>
</template>

<script>
  const url = 'https://www.zebbagreen.cn/SourceHanSansCN-Heavy.ttf'
  const url2 = 'https://www.zebbagreen.cn/FZLTSJW.TTF'
  export default {
    data() {
      return {

        prompt: 'Sea Waves',
        imgsrc: 'https://www.zebbagreen.cn/static/问号icon.svg'

      };
    },


    mounted() {
      uni.loadFontFace({
        family: 'ht',
        source: `url("${url}")`
      })

      // uni.loadFontFace({
      //   family: 'hh',
      //   source: `url("${url2}")`
      // })
    },

    methods: {
      gotodraw() {
        uni.navigateTo({
          url: 'draw?prompt=' + this.prompt + '&firstthemeicon=' + this.imgsrc,
        });

      }


    }
  };
</script>

<style>
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

  .text3 {
    font-size: 35rpx;
    color: #000;
  }


  .GENERATE {
    position: absolute;
    top: 1250rpx;
    right: 60rpx;
  }

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




  .upload-button:active {
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
    width: 1024rpx;
    height: 1240rpx;
  }

  .canvas-element {
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
  }



  .background {
    width: 617rpx;
    height: 616rpx;
    background-image: linear-gradient(rgba(122, 122, 122, 1.0) 1px, transparent 1.5px),
      linear-gradient(90deg, rgba(129, 129, 129, 1.0) 1px, transparent 1.5px);
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
    background-color: #82aaff;

  }
</style>