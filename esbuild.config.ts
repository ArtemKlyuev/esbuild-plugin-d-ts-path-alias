// import fs from 'fs/promises';
// import os from 'os';
import path from 'path';

import { build } from 'esbuild';
import { dTSPathAliasPlugin } from './src/plugin/plugin';

// const withTempDir = async (fn) => {
//   try {
//     return await fn(dir);
//   } finally {
//     fs.rmdir(dir, { recursive: true });
//   }
// };

// const createTempDir = async (): Promise<string> => {
//   const dir = await fs.mkdtemp((await fs.realpath(os.tmpdir())) + path.sep);
//   return dir;
// };

// const removeDir = (dir: string): void => {
//   fs.rmdir(dir, { recursive: true });
// };

const builder = async (out: string): Promise<void> => {
  await build({
    target: 'esnext',
    format: 'esm',
    treeShaking: true,
    // splitting: true,
    // tsconfig: './example/tsconfig.json',
    entryPoints: [path.resolve(__dirname, './example/src/utils/index.ts')],
    plugins: [dTSPathAliasPlugin()],
    // absWorkingDir: path.resolve(__dirname, './example'),
    // outfile: out,
    outdir: out,
    bundle: true,
  });
};

const start = () => {
  builder('./example/build-d-ts');
  // builder('./example/build2.js');
  // builder('build2.js');
};

start();
