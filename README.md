# SwimWorld

SwimWorld 是一个基于 [uni-app](https://uniapp.dcloud.io/) 的小程序，
用于与 Stable Diffusion 接口交互生成“泳动小精灵”图像。用户可以
输入文本并通过滑动手势上传生成的图像进行分享。

## 功能特点

- 通过 AI 生成自定义的泳动小精灵图像；
- 支持滑动触发上传，显示剩余上传次数；
- 内置 [uView](https://www.uviewui.com/) 组件库以构建界面。

## 服务说明

- **Stable Diffusion 接口**：依赖 SD WebUI，默认提供 `7860` 端口的 HTTP API。
- **上传服务器**：`server/upload_server.py` 使用 [Flask](https://flask.palletsprojects.com/) 接收图片，默认监听 `5000` 端口，并将文件保存到 `server/uploads/` 目录。

### 启动上传服务器

```bash
pip install flask
python server/upload_server.py
```

前端会向 `http://<服务器地址>:5000/upload_image` 发送图片，上传后的文件存放在 `server/uploads/` 目录。

## 运行

1. 使用 HBuilderX 或其他支持 `uni-app` 的环境打开本项目；
2. 根据目标平台进行编译或运行（如微信小程序、H5 等）。

## 相关论文

基于本项目的研究成果：

- *(CHI2025)The Immersive Art Therapy Driven by AIGC: An Innovative Approach to Alleviating Children's Nyctophobia*  
  Authors: Jinlin Miao, Zhiyuan Zhou, Yilei Wu, Fenggui Rao*, Fanjing Meng*  
  *:共同通讯作者

## 许可证

本项目遵循 MIT License。
