import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.REPO_NAME ? `/${process.env.REPO_NAME}/` : '/',
  
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://backend_api:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});