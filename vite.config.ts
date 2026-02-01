import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // 1. Ensure relative path for GitHub Pages
  base: './', 

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  
  // 2. CRITICAL: This tells Vite how to find files starting with "@"
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', 
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  }
}));