import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
      include: [/\.vue$/, /\.md$/, /.bib$/],
    }), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/markdown-it|highlight\.js|lodash/.test(id)) return 'markdown-vendor'
          if (/[\\/]konva|vue-konva/.test(id)) return 'konva-vendor'
          if (/[\\/]vue[\\/]|@vue|vue-router/.test(id)) return 'vue-vendor'
        }
      }
    }
  }
})
