var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './index',
    'babel-polyfill'
  ],
  output: {
    path: path.join(__dirname, '../gh-puppies'),
    filename: 'puppies.js',
    publicPath: '/puppy-aggregator/'
  },
  plugins: [
		new HtmlWebpackPlugin(
		{ template: './index.html'
		, inject: true
		}),
    new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({ "process.env": { "NODE_ENV": '"production"' }})
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
}
