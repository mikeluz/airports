'use strict'

const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './client/main.js',
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true,
  },
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ["react", "airbnb", "es2015", "stage-2", ]
        }
      }]
    }]
  },
  plugins: []
};