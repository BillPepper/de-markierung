const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    content: './content.js',
    background: './background.js'},
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')

  },
    plugins: [
      new CopyPlugin([
        {from: './manifest.json', to: 'manifest.json'},
        {from: './icon.png', to: 'icon.png'},
        {from: './icon_128.png', to: 'icon_128.png'},
      ])
    ]
};
