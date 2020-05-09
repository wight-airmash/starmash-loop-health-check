const path = require('path');

module.exports = {
  entry: './src/extension.js',

  output: {
    filename: 'loop-health-check.js',
    path: path.resolve(__dirname, 'dist'),
  },

  externals: [{ fpsmeter: 'FPSMeter' }],
};
