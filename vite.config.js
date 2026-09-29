import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const SITE_URL = 'https://lzawbrito.github.io'

// GitHub Pages only has files, so any route without its own index.html is
// served through 404.html with a 404 status, which search engines skip. Write
// a copy of index.html for each real route so they return 200, and list them
// in a sitemap.
function staticRoutes() {
  let outDir
  return {
    name: 'static-routes',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8')
      const albums = JSON.parse(fs.readFileSync(
        path.join(outDir, 'assets/music/solo/index.json'), 'utf-8'))
      const routes = ['/main', ...albums.filter((a) => !a.hide).map((a) => '/music/solo/' + a.id)]

      fs.writeFileSync(path.join(outDir, '404.html'), html)
      // Pages serves /main from main.html without a trailing-slash redirect
      for (const r of routes) {
        const file = path.join(outDir, r + '.html')
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, html)
      }

      const urls = ['/', ...routes].map((r) => `  <url><loc>${SITE_URL}${r}</loc></url>`)
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'),
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + urls.join('\n') + '\n</urlset>\n')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), staticRoutes()],
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
          if (/[\\/]vue[\\/]|@vue|vue-router/.test(id)) return 'vue-vendor'
        }
      }
    }
  }
})
