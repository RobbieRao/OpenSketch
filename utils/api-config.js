export default {
  // default backend type; change to 'comfyui' to use ComfyUI
  backend: 'stableDiffusion',
  // Stable Diffusion WebUI endpoints
  sdTxt2Img: 'http://localhost:7860/sdapi/v1/txt2img',
  sdImg2Img: 'http://localhost:7860/sdapi/v1/img2img',
  // ComfyUI endpoint for advanced pipelines (not used by default)
  comfyUIPrompt: 'http://localhost:8188/api/prompt'
};
