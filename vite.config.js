import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
// vite.config.js
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      '/api': {
        target: 'https://medisync.inbayti.store',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // يخلي المسار /api/v1/...
      }
    },
   
  },
});



