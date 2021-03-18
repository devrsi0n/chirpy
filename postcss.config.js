// const isProd = process.env.NODE_ENV === 'production';

// module.exports = {
//   plugins: [
//     'tailwindcss',
//     'postcss-flexbugs-fixes',
//     ['postcss-preset-env', {
//         autoprefixer: isProd ? {
//           flexbox: 'no-2009',
//         } : false,
//         stage: 3,
//         features: {
//           'custom-properties': false,
//         },
//     }],
//   ],
// };

module.exports = {
  plugins: {
    '@tailwindcss/jit': {},
    'postcss-flexbugs-fixes': {},
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
};
