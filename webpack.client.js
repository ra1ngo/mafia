const path = require('path');

const DotenvPlugin = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

let mode = process.env.NODE_ENV || 'development';
let port = process.env.CLIENT_PORT || 8080;
const isProd = mode === 'production';

const defaultConfig = require('./webpack.config');
const config = merge(
  {
    entry: './src/client/index.ts',
    resolve: {
      alias: {
        svelte: path.dirname(require.resolve('svelte/package.json')),
        Common: path.resolve(__dirname, './src/common'),
      },
      extensions: ['.mjs', '.ts', '.js', '.json', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    output: {
      path: path.resolve(__dirname, 'public/build/'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: path.resolve(__dirname, 'src/client'),
          loader: 'ts-loader',
        },
        {
          test: require.resolve('Phaser'),
          loader: 'expose-loader',
          options: { exposes: { globalName: 'Phaser', override: true } },
        },
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: !isProd,
              },
              emitCss: isProd,
              hotReload: !isProd,
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          // required to prevent errors from Svelte on Webpack 5+
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    mode,
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new DotenvPlugin(),
    ],
    devtool: isProd ? false : 'eval-source-map',
    devServer: {
      static: path.join(__dirname, 'public/'),
      devMiddleware: {
        publicPath: '/build/',
      },
      host: 'localhost',
      open: true,
      port,
      hot: true,
    },
  },
  defaultConfig
);

module.exports = config;
