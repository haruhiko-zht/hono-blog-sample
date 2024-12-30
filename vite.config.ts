import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import build from '@hono/vite-build/node';
import devServer, { defaultOptions } from '@hono/vite-dev-server';
import nodeAdapter from '@hono/vite-dev-server/node';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        outDir: 'dist',
        rollupOptions: {
          input: {
            hoge: path.resolve(__dirname, 'src/client/hoge.tsx'),
            fuga: path.resolve(__dirname, 'src/client/fuga.tsx'),
            welcome: path.resolve(__dirname, 'src/client/welcome.tsx'),
            style: path.resolve(__dirname, 'src/styles/style.scss'),
          },
          output: {
            entryFileNames: 'client/[name].c.js',
            chunkFileNames: 'client/[name].c.js',
            assetFileNames: 'static/[ext]/[name].[ext]',
          },
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            silenceDeprecations: ['import', 'global-builtin', 'abs-percent', 'color-functions', 'mixed-decls'],
          },
        },
      },
      resolve: {
        alias: {
          '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        },
      },
    };
  } else {
    const env = loadEnv(mode, process.cwd(), '');

    return {
      server: {
        port: Number(env.VITE_DEV_PORT) || 40003,
      },
      ssr: {
        external: ['react', 'react-dom'],
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            silenceDeprecations: ['import', 'global-builtin', 'abs-percent', 'color-functions', 'mixed-decls'],
          },
        },
      },
      plugins: [
        devServer({
          entry: 'src/server/index.tsx',
          injectClientScript: false, // hot-reload
          adapter: nodeAdapter,
          exclude: ['/src/styles/*', ...defaultOptions.exclude], // url path
        }),
        build({
          entry: 'src/server/index.tsx',
          outputDir: 'dist',
          port: Number(env.VITE_NODE_PORT) || 40000,
        }),
      ],
      resolve: {
        alias: {
          '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        },
      },
    };
  }
});
