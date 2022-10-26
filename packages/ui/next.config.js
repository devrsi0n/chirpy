// We only need this file to enable swc transform for jest
/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    browsersListForSwc: true,
  },
  swcMinify: true,
};
