const getConfig = require('@chirpy/jest');
const path = require('path');

// console.log({ config });

module.exports = async () => {
  const config = await getConfig();
  return {
    ...config,
    rootDir: path.resolve(__dirname),
  };
};
