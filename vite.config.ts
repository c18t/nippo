import { defineConfig } from 'vite';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  root: 'src',
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
    outDir: '../assets',
    emptyOutDir: false,
    assetsDir: '.',
    cssMinify: 'lightningcss',
    rollupOptions: {
      input: ['nippo.ts', 'nippo.css'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  // devcontainer auto forwarding workaround (explicitly specify 127.0.0.1)
  // cf. https://zenn.dev/onozaty/articles/docker-desktop-portforward-not-working
  server: {
    host: '127.0.0.1',
  },
});
