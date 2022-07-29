import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
import { resolve } from 'path';
// 引入viteMockServe
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入vue相关的Api
      imports: ["vue"], // 也支持vue-router、axios等
      // 声明文件的存放位置
      dts: 'src/auto-imports.d.ts',
    }),
    viteMockServe({
      logger: false,
      mockPath: "./mock/",
      supportTs: false
    }),
  ],
  base:'./',
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@store": resolve(__dirname, "src/store"),
    },
  },
  build:{
    outDir:'build',
    emptyOutDir:false
  },
  server: {
    port: 3000, //启动端口
    open: true, // 自动打开
    proxy: {
      "/dapi": {
        target: "http://120.76.52.66",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dapi/, ""),
      },
    },
  },
})