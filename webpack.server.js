const path = require('path');
const DotenvPlugin = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'node',
  entry: './src/server/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'server.js',
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [new DotenvPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: isProd ? false : 'eval-source-map',
};
