// import fs from 'fs/promises';
// import os from 'os';
import path from 'path';

import { build } from 'esbuild';

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
    splitting: true,
    // tsconfig: './example/tsconfig.json',
    entryPoints: [path.resolve(__dirname, './example/src/utils/index.ts')],
    // absWorkingDir: path.resolve(__dirname, './example'),
    // outfile: out,
    outdir: out,
    bundle: true,
  });
};

const start = () => {
  builder('./example/build');
};

start();
