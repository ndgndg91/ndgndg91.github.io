import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // Node.js polyfills
      stream: 'stream-browserify',
      util: 'util',
      buffer: 'buffer',
      process: 'process/browser',
      events: 'events',
      timers: 'timers-browserify',
      path: 'path-browserify',
      os: 'os-browserify/browser',
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
    'process.nextTick': 'setTimeout',
    'setImmediate': 'setTimeout',
    'global.setImmediate': 'setTimeout',
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin()
      ],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // react-snap 호환성을 위한 설정
    target: 'es2015', // ES2015로 타겟 변경 (Puppeteer 호환)
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        // react-snap을 위해 청크를 단순화
        manualChunks: undefined,
        // 파일명을 예측 가능하게 설정
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    // 압축 최적화 (esbuild 사용)
    minify: 'esbuild', // 명시적으로 esbuild 사용
    // 소스맵 비활성화 (배포 크기 줄이기)
    sourcemap: false,
    // 청크 크기 경고 조정
    chunkSizeWarningLimit: 1000
  },
  // GitHub Pages에서 라우팅을 위한 파일 복사
  publicDir: 'public',
})
