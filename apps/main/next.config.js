const useAnalysis = process.env.ANALYZE === 'true';
const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
const isProd = process.env.NODE_ENV === 'production';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: useAnalysis && process.env.NODE_ENV !== 'development',
});
const { withPlausibleProxy } = require('next-plausible');
const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent');
const { withAxiom } = require('next-axiom');

const plugins = [withBundleAnalyzer, withPlausibleProxy(), withAxiom];

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.DOCKER && {
    output: 'standalone',
  }),
  productionBrowserSourceMaps: process.env.VERCEL_ENV !== 'production',
  transpilePackages: [
    '@chirpy-dev/emails',
    '@chirpy-dev/ui',
    '@chirpy-dev/utils',
    '@chirpy-dev/types',
    '@chirpy-dev/trpc',
    '@chirpy-dev/analytics',
  ],
  experimental: {
    scrollRestoration: true,
    legacyBrowsers: false,
    swcPlugins: [
      // Allow Date/Map in getStaticProps
      ['next-superjson-plugin', {}],
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/stats/:path*',
        destination: `${analyticsDomain}/api/stats/:path*`,
      },
      {
        source: '/docs',
        destination: '/docs/welcome',
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
      ...(isProd
        ? [
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
          ]
        : []),
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

module.exports = (/* _phase, { defaultConfig } */) =>
  plugins.reduce((acc, plugin) => {
    if (Array.isArray(plugin)) {
      return plugin[0](acc, plugin[1]);
    }
    return plugin(acc);
  }, nextConfig);
