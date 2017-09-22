// for js
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    application: './src/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
};
