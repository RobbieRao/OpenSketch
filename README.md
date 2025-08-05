# OpenSketch

OpenSketch 是一个基于 [uni-app](https://uniapp.dcloud.io/) 的模板工程，支持在移动端或小程序端的画板上涂鸦，并将图像发送到可配置的 AIGC 后端（如 Stable Diffusion WebUI、ComfyUI 等）进行生成。项目同时附带一个简易的上传服务器，用于接收并保存生成的图片。

## 功能特点

- 画板涂鸦并调用 AI 生成图像；
- API 端点可在 `utils/api-config.js` 中配置，以便对接不同的模型或服务；
- 内置 [uView](https://www.uviewui.com/) 组件库构建界面；
- 提供上传服务器示例，便于二次开发。

## 服务说明

- **AIGC 接口**：默认对接 Stable Diffusion WebUI，端口和地址可在 `utils/api-config.js` 中修改，也可替换为 ComfyUI 等其它服务；
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

## 开发

项目的结构、接口切换和二次开发说明见 [DEVELOPMENT.md](DEVELOPMENT.md)。

## 相关论文

基于本项目开发的研究成果：

- *(CHI2025) The Immersive Art Therapy Driven by AIGC: An Innovative Approach to Alleviating Children's Nyctophobia*  
  Authors: Jinlin Miao, Zhiyuan Zhou, Yilei Wu, Fenggui Rao*, Fanjing Meng*  
  *:共同通讯作者

## 许可证

本项目遵循 MIT License。
