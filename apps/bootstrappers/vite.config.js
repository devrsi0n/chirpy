import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({ command }) => {
  if (command === 'serve' || process.env.VITE_DEBUG) {
    dotenv.config({ path: `../main/.env.local` });
  }

  const define = {
    'process.env.NEXT_PUBLIC_APP_URL': JSON.stringify(process.env.NEXT_PUBLIC_APP_URL),
  };

  if (command === 'serve') {
    return {
      root: './',
      server: {
        hmr: {
          host: 'localhost',
        },
        port: 3001,
      },
      define,
    };
  }

  return {
    root: 'public',
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'comment',
        fileName: () => 'comment.js',
        formats: ['umd'],
      },
      outDir: path.resolve(__dirname, '../main/public/bootstrap'),
      ...(process.env.VITE_DEBUG && {
        minify: false,
        sourcemap: true,
      }),
    },
    define,
  };
});
