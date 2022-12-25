const { exec } = require('child_process');

class AfterBuildPlugin {
  constructor(env) {
    this.env = env;
    this.proc = null;
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tap('AfterBuildPlugin', () => {
      if (this.env.afterBuild && !this.proc) {
        this.proc = exec(this.env.afterBuild, (err, stdout, stderr) => {
          if (err) throw err;
          // if (stdout) process.stdout.write(stdout);
          // if (stderr) process.stderr.write(stderr);
        });
        this.proc.stdout.pipe(process.stdout);
        this.proc.stderr.pipe(process.stdout);
        this.proc.on('close', (code) => console.log('Child process exited with exit code ' + code));
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

module.exports = AfterBuildPlugin;
