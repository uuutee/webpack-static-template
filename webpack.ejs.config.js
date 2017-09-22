// for ejs
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fromPairs = require('lodash/frompairs');
const glob = require('glob');
const config = {
  input: './src',
  output: './dist'
};
const files = glob.sync(`${path.resolve(config.input)}/**/!(_)*.+(ejs|htm|html)`);
const entry = fromPairs(
  files.map(filePath => [
    filePath.replace(path.resolve(config.input), '').replace(/\.(?:ejs|html?)$/, ''),
    filePath,
  ])
);

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(config.output),
    filename: '[name].html',
  },
  module: {
    rules: [
      {
        test: /\.(?:ejs|html?)$/,
        use: ExtractTextPlugin.extract('raw-loader!ejs-html-loader'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].html')
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
};
