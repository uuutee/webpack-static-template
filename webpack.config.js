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
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        filename: '../index.html',
        template:  'ejs-render-loader!./src/index.ejs'
      })
    ],
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
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
          }),
          exclude: /node_modules/,
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('bundle.css')
    ],
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
  }
];

