import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Pages from 'vite-plugin-pages';
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // 리액트 플러그인
    cesium(),
    Pages(), // 파일 기반 라우팅
  ],
  resolve: {
    alias: [
      { find: '@src', replacement: path.resolve(__dirname, './src') },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // changeOrigin: true,
        // secure: false,
        // ws: true,
      },
    },
  },
});
