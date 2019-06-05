const path = require('path');

module.exports = {
  entry: {
    contentBundle: './src/content.js',
    backgroundBundle: './src/background.js'},
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')

  }
};
