import { defineConfig } from 'vite';
import { minifyHtml } from 'vite-plugin-html';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@supple-css': path.resolve(
        __dirname,
        './node_modules/@supple-kit/supple-css/',
      ),
      '@styles': path.resolve(__dirname, './src/assets/styles'),
    },
  },
  plugins: [minifyHtml()],
});
