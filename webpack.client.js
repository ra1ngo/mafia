const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const DotenvPlugin = require('dotenv-webpack');
const dotenv = require('dotenv');

let mode = process.env.NODE_ENV || 'development';
let port = process.env.CLIENT_PORT || 8080;
const result = dotenv.config();
if (result.error) {
  throw result.error;
} else if (result.parsed.hasOwnProperty('NODE_ENV')) {
  mode = result.parsed.NODE_ENV;
  port = result.parsed.CLIENT_PORT;
}
const prod = mode === 'production';

module.exports = {
  entry: './src/client/index.ts',
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
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
              dev: !prod,
            },
            emitCss: prod,
            hotReload: !prod,
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
  devtool: prod ? false : 'source-map',
  devServer: {
    static: path.join(__dirname, 'public/'),
    devMiddleware: {
      publicPath: '/build/',
    },
    host: 'localhost',
    open: false,
    port,
    hot: true,
  },
};
