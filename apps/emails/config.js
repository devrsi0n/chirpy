/*
|-------------------------------------------------------------------------------
| Development config               https://maizzle.com/docs/environments/#local
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

module.exports = {
  postcss: { options: { from: 'src/css/tailwind.css' } },
  build: {
    content: ['src/templates/**/*.html'],
    output: { path: 'build_local', from: ['src/templates'] },
  },
};
