// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: env.VITE_BACKEND_URL, // replace with your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
