const { withPlugins } = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const customConfig = {
  webpack(config, dev, isServer) {
    // Use ts-loader for decorators support
    for (const rule of config.module.rules) {
      if (rule.test && rule.test.test('foo.ts')) {
        rule.use = [].concat(rule.use, {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        });
      }
    }
    // const entryFactory = config.entry;
    // config.entry = () => (
    //   entryFactory()
    //     .then((entry) => {
    //       console.log({ entry });
    //       // if (!entry["main"]) {
    //       //   return entry;
    //       // }
    //       // entry["main"] = [
    //       //   "./src/comment.ts",
    //       //   entry["main"],
    //       // ];
    //       // entry['widget/comment'] = "./src/comment.ts";
    //       // entry["main.js"] = [
    //       //   "./src/comment.ts",
    //       //   ...entry["main.js"],
    //       // ];
    //       if (!isServer) {
    //         return {
    //           ...entry,
    //           'public/comment': './src/lib/comment.ts',
    //         };
    //       }
    //       return entry;
    //     })
    // );
    return config;
  },
};

module.exports = withPlugins(
  [[withBundleAnalyzer(customConfig)]],
  // customConfig
);
