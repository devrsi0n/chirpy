const { withPlugins } = require('next-compose-plugins');
const useAnalysis = process.env.ANALYZE === 'true';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: useAnalysis && process.env.NODE_ENV !== 'development',
});
const { withPlausibleProxy } = require('next-plausible');
const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent');

const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = withPlugins(
  [
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
      ];
    },
    webpack: function (config, options) {
      const { dev, isServer } = options;

      if (useAnalysis && !dev && !isServer) {
        config.plugins.push(new RelativeCiAgentWebpackPlugin());
      }

      return config;
    },
  },
);
