import { defineConfig } from 'vite'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'test',
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')),
      drafts: {
        customMedia: true,
      },
    },
  },
  build: {
    outDir: 'output',
    emptyOutDir: false,
    assetsDir: '.',
    cssMinify: 'lightningcss',
    rollupOptions: {
      input: [
        'src/css/style.css',
        'src/js/main.ts',
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
