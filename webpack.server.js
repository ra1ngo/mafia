const path = require('path');
const exec = require('child_process').exec;
os = require('os');
//const spawn = require('child_process').spawn;
const nodeExternals = require('webpack-node-externals');
const DotenvPlugin = require('dotenv-webpack');
const dotenv = require('dotenv');
const AfterBuildPlugin = require('./afterBuildPlugin.js');

let mode = process.env.NODE_ENV || 'development';
const result = dotenv.config();
if (result.error) {
  throw result.error;
} else if (result.parsed.hasOwnProperty('NODE_ENV')) {
  mode = result.parsed.NODE_ENV;
}

module.exports = (env) => ({
  mode: mode,
  entry: './src/server/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src/server'),
        exclude: path.resolve(__dirname, 'src/client'),
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [new DotenvPlugin(), new AfterBuildPlugin(env)],
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
});
