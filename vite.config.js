import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ArenaGG v2.1 — build config updated to force fresh Vercel deploy
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      }
    }
  }
})
