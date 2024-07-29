import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically open the app in the browser
    port: 3000  // Change the port if needed
  },
  build: {
    outDir: 'dist', // Output directory for the build
    sourcemap: true // Generate source maps for debugging
  }
})
