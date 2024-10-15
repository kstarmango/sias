import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: 'http://localhost:8080/v3/api-docs',
    output: {
      mode: 'single',
      target: './src/api/sais.ts',
      client: 'react-query',
      mock: false,
      override: {
        // axios 지정
        mutator: {
          path: './src/api/axiosInstance.ts',
          name: 'axiosInstance',
        },
        query: {
          useSuspenseQuery: true,
          // version: 5,
        },
      },
    },
    // hooks: {
    //     afterAllFilesWrite: 'prettier --write',
    // },
  },
});