const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// for ejs
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
      new CleanWebpackPlugin(['dist']),
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
  },
  {
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
  },
];




