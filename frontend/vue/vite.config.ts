import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 4200,
    proxy: {
      '/api': {
        target: "http://localhost:1080",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api', ''),
      }
    },
  },
})
