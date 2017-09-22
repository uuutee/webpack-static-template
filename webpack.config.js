const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  require('./webpack.js.config.js'),
  require('./webpack.css.config.js'),
  require('./webpack.ejs.config.js'),
];
