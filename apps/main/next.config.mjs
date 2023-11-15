const useAnalysis = process.env.ANALYZE === 'true';

import bundler from '@next/bundle-analyzer';

const withBundleAnalyzer = bundler({
  enabled: useAnalysis && process.env.NODE_ENV !== 'development',
});

import { RelativeCiAgentWebpackPlugin } from '@relative-ci/agent';
import { withAxiom } from 'next-axiom';

const plugins = [withBundleAnalyzer, withAxiom];

await import('./src/env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: process.env.VERCEL_ENV !== 'production',
  transpilePackages: [
    '@chirpy-dev/emails',
    '@chirpy-dev/react-email',
    '@chirpy-dev/ui',
    '@chirpy-dev/utils',
    '@chirpy-dev/types',
    '@chirpy-dev/trpc',
    '@chirpy-dev/analytics',
  ],
  experimental: {
    scrollRestoration: true,
    useDeploymentId: true,
    swcPlugins: [
      // Allow Date/Map in getStaticProps
      ['next-superjson-plugin', {}],
    ],
  },
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs/welcome',
      },
      {
        source: '/bootstrap/comment.js',
        destination: '/bootstrapper.js',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/widget/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/(.*)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/css/(.*)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, must-revalidate',
          },
        ],
      },
    ];
  },
  webpack: function (config, options) {
    const { dev, isServer } = options;

    if (useAnalysis && !dev && !isServer) {
      config.plugins.push(new RelativeCiAgentWebpackPlugin());
    }
    config.module.rules.push({
      test: /\.html$/,
      loader: 'html-loader',
    });
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
      };
    }
    return config;
  },
};

export default (/* _phase, { defaultConfig } */) =>
  plugins.reduce((acc, plugin) => {
    if (Array.isArray(plugin)) {
      return plugin[0](acc, plugin[1]);
    }
    return plugin(acc);
  }, nextConfig);
