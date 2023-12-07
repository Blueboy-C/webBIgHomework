import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { OutliningSpanKind } from 'typescript'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    rollupOptions: {
      output:path.resolve(__dirname, 'dist'),
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port: 8080,
    proxy:{
      '/api':{
        target:"http://10.60.82.146:8080",
        rewrite(path) {
          return path.replace(/^\/api/, '')
        },
        changeOrigin: true
      }
    }
  }

})
