import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7001', // Your API URL
        changeOrigin: true,
        secure: false, // Set to true if your API uses a valid SSL certificate
      },
      '/chatHub': {
        target: 'https://localhost:7001', // Your API URL
        changeOrigin: true,
        secure: false, // Set to true if your API uses a valid SSL certificate
        ws: true, // Enable WebSocket proxy
      },
    },
  },
})
