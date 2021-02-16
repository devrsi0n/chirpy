const execa = require('execa');

async function start() {
  try {
    const startProcess = execa('node', ['server.js'], {
      env: {
        ...process.env,
        NODE_ENV: 'production'
      },
    });
    startProcess.stdout.pipe(process.stdout);
    startProcess.stderr.pipe(process.stderr);
    startProcess.then(() => {
    }).catch((error) => {
      throw error;
    });
  } catch (error) {
    throw error;
  }
}

start();
