const { withPlugins } = require('next-compose-plugins');
const useAnalysis = process.env.ANALYZE === 'true';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: useAnalysis && process.env.NODE_ENV !== 'development',
});
const { withPlausibleProxy } = require('next-plausible');
const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent');
const { withAxiom } = require('next-axiom');

const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
const isProd = process.env.NODE_ENV === 'production';

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = withPlugins(
  [
    [withAxiom],
    [withBundleAnalyzer],
    [
      withPlausibleProxy({
        customDomain: analyticsDomain,
        trackOutboundLinks: true,
        trackLocalhost: true,
        selfHosted: true,
        enabled: true,
      }),
    ],
  ],
  {
    experimental: {
      scrollRestoration: true,
      legacyBrowsers: false,
      browsersListForSwc: true,
    },
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: '/api/stats/:path*',
          destination: `${analyticsDomain}/api/stats/:path*`,
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
      return config;
    },
  },
);
