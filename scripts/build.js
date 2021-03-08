const execa = require('execa');

async function build() {
  try {
    const parcel = execa('npx', [
      'parcel',
      'build',
      './src/external/comment.ts',
      '--out-dir',
      'public',
      '--no-source-maps',
    ]);
    parcel.stdout?.pipe(process.stdout);
    parcel.stderr?.pipe(process.stderr);
    parcel.catch((error) => {
      throw error;
    });

    const nextBuildProcess = execa('npx', ['next', 'build']);
    nextBuildProcess.stdout?.pipe(process.stdout);
    nextBuildProcess.stderr?.pipe(process.stderr);
    nextBuildProcess.then(() => {
    }).catch((error) => {
      throw error;
    });
  } catch (error) {
    throw error;
  }
}

build();
