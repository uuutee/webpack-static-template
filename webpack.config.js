var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    entry: {
      application: './src/js/main.js',
    },
    output: {
      path: path.resolve(__dirname, './dist/js'),
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackPlugin({
        filename: '../index.html',
        template:  'ejs-render-loader!./src/index.ejs'
      })
    ]
  },
  {
    entry: {
      application: './src/scss/main.scss'
    },
    output: {
      path: path.resolve(__dirname, './dist/css'),
      filename: 'bundle.css'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  minimize: true,
                }
              },
              'sass-loader'
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('bundle.css')
    ]
  }
];
