import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  
  // 🟢 CRITICAL FIX FOR GITHUB PAGES: 
  // Sets all asset paths to be relative to the deployment folder.
  base: './', 
  
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Explicitly ensure output directory is set (usually 'dist')
  build: {
    outDir: 'dist',
  }
}));