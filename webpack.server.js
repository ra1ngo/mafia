const path = require("path");
const exec = require('child_process').exec;
os = require('os');
//const spawn = require('child_process').spawn;
const nodeExternals = require('webpack-node-externals');
const DotenvPlugin = require('dotenv-webpack');
const dotenv = require('dotenv');

let mode = process.env.NODE_ENV || 'development';
const result = dotenv.config();
if (result.error) {
  throw result.error;
} else if (result.parsed.hasOwnProperty('NODE_ENV')) {
  mode = result.parsed.NODE_ENV;
}

class AfterBuildPlugin {
  constructor(env) {
    this.env = env;
    this.proc = null;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('AfterBuildPlugin', () => {
      if (this.env.afterBuild && !this.proc) {
        this.proc = exec(
          this.env.afterBuild,
          (err, stdout, stderr) => {
            if (err) throw err;
            // if (stdout) process.stdout.write(stdout);
            // if (stderr) process.stderr.write(stderr);
          }
        );
        this.proc.stdout.pipe(process.stdout);
        this.proc.stderr.pipe(process.stdout);
        this.proc.on('close', (code) => console.log('Child process exited with exit code '+code));
        // const child = spawn(this.env.afterBuild);
        // child.stdout.on('data', function (data) {
        //     process.stdout.write(data);
        // });
        // child.stderr.on('data', function (data) {
        //     process.stderr.write(data);
        // });
      }
    });
  }
}

module.exports = (env) => ({
  mode: mode,
  entry: './src/server/index.ts',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'server/build')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'src/server'),
          path.resolve(__dirname, 'src/common'),
        ],
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  },
  plugins: [
    new DotenvPlugin(),
    new AfterBuildPlugin(env),
  ],
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
});