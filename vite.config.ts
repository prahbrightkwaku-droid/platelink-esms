// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 🟢 CORRECTED BASE PATH: Matches the GitHub repo name 'platelink-esms'
  base: '/platelink-esms/', 
  
  build: {
    outDir: 'dist',
  },
});