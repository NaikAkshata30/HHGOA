import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) return 'react'
            if (id.includes('react-dom')) return 'react'
            if (id.includes('/react/')) return 'react'
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('react-dropzone')) return 'dropzone'
            if (id.includes('lucide-react')) return 'icons'
          }
        },
      },
    },
  },
})
