import { defineConfig } from 'vite';
import { sync as globSync } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import postcssSortMediaQueries from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: globSync('./src/*.html'),
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
    css: {
      postcss: {
        plugins: [postcssSortMediaQueries()],
      },
    },
  };
});
