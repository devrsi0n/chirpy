const { withPlugins } = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true' && process.env.NODE_ENV !== 'development',
});

const customConfig = {
  // future: {
  //   webpack5: true,
  // },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    // if (!isServer) {
    //   config.node = { fs: 'empty', module: 'empty' };
    // }

    return config;
  },
};

module.exports = withPlugins([[withBundleAnalyzer(customConfig)]], {
  // experimental: { modern: true }
});
