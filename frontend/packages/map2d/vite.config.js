import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// https://vitejs.dev/config/
export default defineConfig({
    base: '/map2d',
    plugins: [
        react(), // 리액트 플러그인
    ],
    resolve: {
        alias: [
            { find: '@src', replacement: resolve(__dirname, './src') },
            { find: '@shared', replacement: resolve(__dirname, '../shared/src') },
        ],
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            '/geoserver': {
                target: 'http://118.216.255.110:25050',
                // rewrite: (path) => path.replace(/^\/geoserver/, ''),
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
});
