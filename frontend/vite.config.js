import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.REPO_NAME ? `/${process.env.REPO_NAME}/` : '/',
  proxy: {
    '/api': {
      target: 'http://localhost:5002', // Updated from 5000 to 5002
      changeOrigin: true,
    }
  }
})