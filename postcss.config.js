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

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: {
    'tailwindcss': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
    },
  },
};
