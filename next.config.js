const { withPlugins } = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true' && process.env.NODE_ENV !== 'development',
});

const customConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};

module.exports = withPlugins(
  [[withBundleAnalyzer(customConfig)]],
  {
    // experimental: { modern: true }
  }
);
