import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: !options.watch,
  format: ['cjs', 'esm'],
  env: {
    NODE_ENV: options.watch ? 'development' : 'production',
  },
  external: [
    'react',
    'react-dom',
    'next',
    'next-auth',
    'graphql',
    'graphql-tag',
    'graphql-tag',
  ],
  dts: true,
  esbuildPlugins: [sassPlugin()],
}));
