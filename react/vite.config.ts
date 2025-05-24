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
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          // 써드파티 라이브러리를 별도 청크로 분리
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          crypto: ['crypto-js', 'jsencrypt'],
          ui: ['lucide-react', 'react-hot-toast']
        },
        // 파일명에 해시 추가로 캐싱 최적화
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // 압축 최적화 (esbuild 사용)
    minify: true, // 기본값은 esbuild
    // 소스맵 비활성화 (배포 크기 줄이기)
    sourcemap: false,
    // 청크 크기 경고 조정
    chunkSizeWarningLimit: 1000
  },
  // GitHub Pages에서 라우팅을 위한 파일 복사
  publicDir: 'public',
})
