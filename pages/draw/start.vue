<template>

  <view class="back"></view>
  <!-- 文字 -->
  <view class="circle"
    style="position: absolute;top: 150rpx;right: 150rpx; border-radius: 100%; width: 100rpx; box-shadow: 0 0 200rpx 200rpx rgba(255, 230, 241, 1.0);"
    :animation='changecolor'>
  </view>
  <view class="circle"
    style="position: absolute;top: 650rpx;left: 150rpx; border-radius: 100%; box-shadow: 0 0 300rpx 300rpx rgba(83, 100, 255, 1.0);"
    :animation='changecolor'>
  </view>
  <view class="circle"
    style="position: absolute;top: 1050rpx;right: 150rpx; border-radius: 100%; box-shadow: 0 400rpx 400rpx 200rpx rgba(255, 191, 209, 1.0);"
    :animation='changecolor'>
  </view>

  <!--  <view class=" container"
    style=" top: 75rpx; width: 100%; height: 100%; position: absolute; pdisplay: flex; justify-content: center; flex-direction: row;align-items: center;">
    <text class="name">海胆</text>
    <text class="name">海星</text>
    <b></b>
    <text class="name">螃蟹</text>
    <text class="name">鲸鱼</text>
    <b></b>
    <text class="name">海豚</text>
    <text class="name">水母</text>
  </view> -->


  <view class="content" style="position: absolute; width: 100%; height: 100%;">
  </view>

  <view class=" container" style="display: flex; flex-direction: column;align-items: center;">

    <!--  -->
    <view class="content" style="display: flex; flex-direction: column;align-items: left;width: 100%; height: 2350rpx;">
      <image class="image1" src="https://www.zebbagreen.cn/static/海胆.svg"
        style="position: absolute; width: 600rpx;height: 600rpx;left: -150rpx; top: -100rpx; transform: rotate(45deg);"
        @tap="handleImageTap(1)" :animation="image1animate">
      </image>
      <image class="image2" src="https://www.zebbagreen.cn/static/海星.svg"
        style="position: absolute; width: 600rpx; height: 600rpx; top: -150rpx; right: -150rpx;"
        :animation="image2animate" @tap="handleImageTap(2)"></image>
      <image class="image3" src="https://www.zebbagreen.cn/static/鲸鱼.svg"
        style="position: absolute; width: 600rpx; height: 600rpx; right: 10rpx;top: 250rpx; right: -80rpx; ; transform:  rotate(15deg);"
        :animation="image4animate" @tap="handleImageTap(4)">
      </image>
      <image class="image4" src="https://www.zebbagreen.cn/static/水母.svg"
        style="position: absolute; width: 500rpx; height: 500rpx; right: -100rpx; top: 650rpx;"
        :animation="image6animate" @tap="handleImageTap(6)">
      </image>
      <image class="image5" src="https://www.zebbagreen.cn/static/海豚.svg"
        style="position: absolute; width: 750rpx; height: 750rpx; left: -200rpx;top: 440rpx; transform: rotate(-20deg); "
        :animation="image5animate" @tap="handleImageTap(5)">
      </image>
      <image class="image6" src="https://www.zebbagreen.cn/static/螃蟹.svg"
        style="position: absolute; width: 320rpx; height: 320rpx; left: -30rpx; top: 400rpx; transform: rotate(-20deg);"
        :animation="image3animate" @tap="handleImageTap(3)">
      </image>
    </view>

    <!-- 文字按钮区域 -->
    <view class="content" style="display: flex; flex-direction: column ;align-items: left;width: 100%; height: 1000rpx;"
      :animation="textanimate">
      <text class="text"
        style="margin-left: 20rpx; font-size:72rpx;font-weight: bolder;color:#000000 ; line-height: 100rpx; font-family: 'hh';">与AI共创</text>
      <text class="text"
        style="margin-left: 20rpx; font-size:72rpx;font-weight: bolder;color:#000000 ; font-family: 'hh'">生成你的泳动小精灵！</text>
      <text class="text"
        style="margin-left: 20rpx; font-size:36rpx;font-weight: bolder;color:#ff4583 ; margin-top: 20rpx; font-family: 'hh'">心心相融，@未来！</text>
      <button class="button" @click="startAnimation"
        style=" position: absolute; font-family: 'hh'; display: flex; flex-direction: column; justify-content: center; text-align: center;align-items: center; bottom: 50rpx;">开始创作</button>
      <button class="button2" @click="switchEnglish"
        style=" position: absolute; font-family: 'hh'; display: flex; flex-direction: column; justify-content: center; text-align: center;align-items: center; bottom: 50rpx;right: 50rpx;">EN/中文</button>
    </view>

    <button class="button"
      style=" position: absolute; right: -1500rpx;font-family: 'hh'; display: flex; flex-direction: column; justify-content: center; text-align: center;align-items: center; bottom: 50rpx; "
      :animation="confirmaimate" @tap="godraw">
      <image class="icon" src="/static/对勾.svg" style="position: relative;;width: 80rpx; 
  height: 80rpx; " />
    </button>
    <view class="content"
      style=" position: absolute; display: flex; flex-direction: column ;align-items: left;width: 100%; height:200rpx; bottom: 180rpx; text-align: center; opacity: 0; "
      :animation='chooseTxt'>
      <view class="">
        <text class="text"
          style="margin-left: 20rpx; font-size:72rpx;font-weight: bolder;color:#000000 ; line-height: 100rpx; font-family: 'hh';">选择一个</text>
        <text class="text"
          style=" font-size:72rpx;font-weight: bolder;color:#000000 ; line-height: 100rpx; font-family: 'hh';color: #ff4583; ">{{ themeCC  ? themeCC : '小动物'}}</text>
      </view>
      <text class="text"
        style="margin-left: 20rpx; font-size:72rpx;font-weight: bolder;color:#000000 ; font-family: 'hh'">作为创作主题!</text>
    </view>

  </view>

</template>

<script>
  const url = 'https://www.zebbagreen.cn/FZLTSJW.TTF'
  const url0 = 'https://www.zebbagreen.cn/FZLTSJW.TTF'
  export default {
    name: 'MyPage',
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

        theme: {}, // 新增theme属性
        themeC: {}, // 新增theme属性
        themeCC: "", // 新增theme属性

        chooseTxt: null,
        firstthemeiconCHINA: ''


      };
    },

    onLoad() {
      //字体
      uni.loadFontFace({
          family: 'hh',
          source: `url("${url}")`
        }),
        uni.loadFontFace({
          family: 'ht',
          source: `url("${url0}")`
        })
    },

    methods: {
      switchEnglish() {
        uni.navigateTo({
          url: '/pages/english/start',
        });

      },


      startAnimation() {

        const animate1 = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animate1
          .translate('10rpx')
          .scale(0.5)
          .step({
            duration: 1000
          });
        const animate2 = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animate2
          .translate('-50rpx', '30rpx')
          .scale(0.5)
          .step({
            duration: 1000
          });
        const animate3 = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animate3
          .translate('40rpx')
          .scale(1)
          .step({
            duration: 1000
          });
        const animate4 = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animate4
          .translate('25rpx', '35rpx')
          .scale(0.5)
          .step({
            duration: 1000
          });
        const animate5 = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animate5
          .translate('10rpx', '150rpx')
          .scale(0.5)
          .step({
            duration: 1000
          });
        const animate6 = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animate6
          .translate('-50rpx', '50rpx')
          .scale(0.5)
          .step({
            duration: 1000
          });
        const animate7 = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animate7
          .translate('-1000rpx')
          .scale(0.5)
          .step({
            duration: 1000
          });

        const animate8 = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animate8
          .translate('-750rpx')
          .step({
            duration: 1000
          });

        const animatetxt = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        animatetxt
          .opacity(1)
          .step({
            duration: 1000
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
        const texts = ['sea ​​urchin', 'starfish', 'Crab',
          'whale', 'dolphin', 'jellyfish'
        ]; // 每个 index 对应的文本值
        const textsC = ['https://www.zebbagreen.cn/static/海胆icon.svg', 'https://www.zebbagreen.cn/static/海星icon.svg',
          'https://www.zebbagreen.cn/static/螃蟹icon.svg',
          'https://www.zebbagreen.cn/static/鲸鱼icon.svg', 'https://www.zebbagreen.cn/static/海豚icon.svg',
          'https://www.zebbagreen.cn/static/水母icon.svg'
        ]; // 每个 index 对应的文本值
        const textsCC = ['海胆', '海星', '螃蟹',
          '鲸鱼', '海豚', '水母'
        ]; // 每个 index 对应的文本值

        for (let i = 1; i <= 6; i++) {
          const resetAnimation = uni.createAnimation({
            duration: 200,
            timingFunction: 'ease',
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

        this.theme.text = texts[index - 1]; // 使用 index 对应的文本值
        this.themeC.text = textsC[index - 1]; // 使用 index 对应的文本值
        this.themeCC = textsCC[index - 1]; // 使用 index 对应的文本值
        console.log(this.themeC.text)
      },
      godraw() {
        uni.navigateTo({
          url: 'draw?prompt=' + this.theme.text + '&firstthemeicon=' + this.themeC.text + '&firstthemeiconCHINA=' +
            this
            .themeCC,
        });

      }
    },





  };
</script>

<style>
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;

  }

  .name {
    font-size: 72rpx;
    font-weight: 900;
    margin: 100rpx;
    line-height: 440rpx;
  }



  .button {
    position: relative;
    left: 10rpx;
    font-weight: bolder;
    width: 300rpx;
    height: 90rpx;
    line-height: 80rpx;
    padding: 0 30rpx;
    font-size: 32rpx;
    background-color: #3FE2EB;
    color: #000;
    border-radius: 50px;
  }

  .button2 {
    font-weight: bolder;
    width: 200rpx;
    height: 90rpx;
    line-height: 80rpx;
    padding: 0 30rpx;
    font-size: 32rpx;
    background-color: #ffffff;
    color: #000;
    border-radius: 50px;
  }



  .lifecard {
    position: absolute;
    display: flex;
    align-items: center;
    width: 400rpx;
    height: 400rpx;
  }


  .button2:active {
    background-color: #5f6bd2;
    color: white;
    border: 0px solid #000;
  }

  .button:active {
    background-color: #D2396A;
    color: white;
    border: 0px solid #000;
    /* Add black solid border */

    /* Remove border radius */
  }
</style>