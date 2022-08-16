const { resolve } = require('path');

module.exports = {
  ...require('@rrios-dev/node-config/eslint-node-package-preset'),
  parserOptions: {
    project: resolve(__dirname, 'tsconfig.json'),
  }
};
