// const { withPlugins } = require('next-compose-plugins');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true' && process.env.NODE_ENV !== 'development',
// });
const { withPlausibleProxy } = require('next-plausible');

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = withPlausibleProxy({
  customDomain: 'https://analytics.chirpy.dev',
  trackOutboundLinks: true,
  trackLocalhost: true,
  selfHosted: true,
  enabled: true,
})({});
// module.exports = withPlugins([
//   [
//     withBundleAnalyzer({
//       // swcMinify: true,
//     }),
//   ],
//   [
//     withPlausibleProxy({
//       customDomain: 'https://analytics.chirpy.dev',
//       trackOutboundLinks: true,
//       trackLocalhost: true,
//       selfHosted: true,
//       enabled: true,
//     })(),
//   ],
// ]);
