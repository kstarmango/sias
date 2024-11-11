import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/map3d/',
  plugins: [react(), cesium(),],
  resolve: {
    alias: [
      { find: '@src', replacement: path.resolve(__dirname, './src') },
      { find: '@shared', replacement: path.resolve(__dirname, '../shared/src') },
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
