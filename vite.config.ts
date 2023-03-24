import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import viteCompression from 'vite-plugin-compression' // 配置 gzip 压缩
import { Plugin as importToCDN } from 'vite-plugin-cdn-import' // 配置 cdn 加速
import { visualizer } from 'rollup-plugin-visualizer' // 依赖分析
import viteImagemin from 'vite-plugin-imagemin' //图片压缩

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    viteCompression(),
    importToCDN({
      modules: [
        {
          // 需要 CDN 加速的包名称
          name: 'lodash',
          // 全局分配给模块的变量，Rollup 需要这个变量名称
          var: 'lodash',
          // 指定 CDN 上的加载路径
          path: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js`,
        },
      ],
    }),
    visualizer({
      emitFile: false,
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  build: {
    // rollup 配置
    rollupOptions: {
      output: {
        manualChunks(id: any): any {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
    //   关闭文件计算
    reportCompressedSize: false,
    //   关闭生成map文件 可以达到缩小打包体积
    sourcemap: false, // 这个生产环境一定要关闭，不然打包的产物会很大
  },
  // 反向代理
  server: {
    host: '0.0.0.0',
    port: 5566,
    fs: {
      strict: false,
    },
    proxy: {},
  },
})
