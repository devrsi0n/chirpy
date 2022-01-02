const { withPlugins } = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true' && process.env.NODE_ENV !== 'development',
});
const { withPlausibleProxy } = require('next-plausible');
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
    async rewrites() {
      return [
        {
          source: '/api/stats/:path*',
          destination: `${analyticsDomain}/api/stats/:path*`,
        },
      ];
    },
  },
);
