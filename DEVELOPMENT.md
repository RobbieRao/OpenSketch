# Development Guide

本说明文档帮助开发者在 `OpenSketch` 项目基础上进行二次开发或接入不同的 AIGC 服务。

## 目录结构

- `pages/draw/draw.vue`：主要的画板逻辑与接口调用。
- `utils/api-config.js`：统一管理后端接口地址，可切换不同的服务。
- `server/upload_server.py`：示例上传服务器，接收前端生成的图片。

## 更换或新增后端服务

1. 在 `utils/api-config.js` 中修改默认的 `sdTxt2Img` 和 `sdImg2Img` 地址，使其指向你自己的 Stable Diffusion WebUI。
2. 若使用 [ComfyUI](https://github.com/comfyanonymous/ComfyUI)，可在该文件中设置 `comfyUIPrompt`，并在 `pages/draw/draw.vue` 中按需新增调用逻辑。
3. 若接入其他模型，只需在配置文件中添加新的端点，并在前端方法中使用对应的地址即可。

## 自定义主题与界面

- 在 `pages` 目录下新增或修改页面，即可更换界面主题。
- 使用 `uView` 组件库可快速搭建常见 UI 组件。

## 上传服务器

示例服务器位于 `server/upload_server.py`，其功能极简，只负责接收 POST 上传的图片并保存到 `server/uploads/` 目录。实际部署时可以：

- 增加用户鉴权；
- 将文件保存到云存储；
- 根据业务需求返回自定义的响应。

## 构建与运行

使用 [HBuilderX](https://www.dcloud.io/hbuilderx.html) 或其它支持 `uni-app` 的环境打开项目，根据目标平台编译或运行。

## 贡献

欢迎提交 Issue 或 PR 来改进项目模板。
