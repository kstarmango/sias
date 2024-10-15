import path from "path";
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // 리액트 플러그인
    // tsconfigPaths()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'shared',
    },
    // rollupOptions: {
    //   external: ['react', 'react-dom'],
    //   output: {
    //     globals: {
    //       react: 'React',
    //       'react-dom': 'ReactDOM',
    //     },
    //   },
    // }
  },
  resolve: {
    alias: [
      {find: '@shared', replacement: path.resolve(__dirname, './src')},
    ],
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080',
  //       // changeOrigin: true,
  //       // secure: false,
  //       // ws: true,
  //     },
  //   },
  // },
});
