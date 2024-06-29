import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1234,
    host: true
  },
  resolve: {
    alias: {
      "/@/": path.join(__dirname, "src") + "/"
    }
  },
  plugins: [react()],
})
