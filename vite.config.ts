import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Note: Assuming 'lovable-tagger' is a necessary custom utility/plugin
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  
  // CRITICAL FIX: Use relative base path for GitHub Pages asset loading
  base: './', 
  
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  
  // Include plugins, filtering out development-only plugins in production mode
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  build: {
    outDir: 'dist',
    // Robust Rollup configuration to ensure paths inside the bundles are correct
    rollupOptions: {
      output: {
        // Ensure that chunk and entry file names reference the assets folder
        assetFileNames: 'assets/[name]-[hash][extname]', 
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  }
}));