import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require("path");
export default defineConfig({
  base:'./',
  resolve: {
    alias: {
      '@': resolve(__dirname, "./src"),
    },
  },

  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 1024
  }
})
