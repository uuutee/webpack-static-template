// for css
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =   {
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
};
