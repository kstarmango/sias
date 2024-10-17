import path from "path";
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // 리액트 플러그인
  ],
  resolve: {
    alias: [
      {find: '@shared', replacement: path.resolve(__dirname, './src')},
    ],
  },
});
