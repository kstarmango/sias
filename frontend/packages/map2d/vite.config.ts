import {resolve} from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/map2d',
  plugins: [react()],
  resolve: {
    alias: [
      {find: '@src', replacement: resolve(__dirname, './src')},
      {find: '@shared', replacement: resolve(__dirname, '../shared/src')},
    ],
  }
});
