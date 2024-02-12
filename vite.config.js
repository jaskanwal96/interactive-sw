// vite.config.js
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  // Configuration options
  root: '.', // Project root directory (where your index.html is located)
  build: {
    outDir: 'dist', // Specify the output directory for build files
  },
  server: {
    open: true, // Automatically open the app in your browser on server start
  },
  plugins: [eslintPlugin()]
});
