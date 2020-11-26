const { withPlugins } = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const customConfig = {
  // webpack(config, dev, isServer) {
  //   // Use ts-loader for decorators support
  //   for (const rule of config.module.rules) {
  //     if (rule.test && rule.test.test('foo.ts')) {
  //       rule.use = [].concat(rule.use, {
  //         loader: 'ts-loader',
  //         options: {
  //           transpileOnly: true,
  //         },
  //       });
  //     }
  //   }
  //   return config;
  // },
};

module.exports = withPlugins(
  [[withBundleAnalyzer(customConfig)]],
  // customConfig
);
