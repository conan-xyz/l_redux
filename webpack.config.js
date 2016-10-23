var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry:[
      './src/entry.js'
  ],

  output: {
      path: __dirname + '/dest/',
      filename: '[name].js'
  },
  
  module: {
      loaders: [
          { 
            test: /\.js$/, 
            exclude: 'node_modules',
            loader: 'babel-loader',
          },
      ]
  },
};