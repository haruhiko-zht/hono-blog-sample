import path from 'path';
import { defineConfig } from 'vite';
import devServer, { defaultOptions } from '@hono/vite-dev-server';
import nodeAdapter from '@hono/vite-dev-server/node';

export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 45173,
    },
    ssr: {
      external: ['react', 'react-dom'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    plugins: [
      devServer({
        entry: 'src/backend/server.tsx',
        injectClientScript: false, // hot-reload
        adapter: nodeAdapter,
        exclude: ['/src/styles/*', ...defaultOptions.exclude],
      }),
    ],
    resolve: {
      alias: {
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      },
    },
  };
});
