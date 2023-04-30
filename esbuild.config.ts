import { build, BuildOptions } from 'esbuild';
import rimraf from 'rimraf';

import { devDependencies, peerDependencies } from './package.json';
import { dTSPathAliasPlugin } from './src';

const DIST_DIR = 'dist';
const EXTERNAL_PACKAGES = Object.keys({ ...devDependencies, ...peerDependencies });

const baseOptions: BuildOptions = {
  target: 'es2020',
  external: EXTERNAL_PACKAGES,
  platform: 'node',
  entryPoints: ['./src/index.ts'],
  bundle: true,
  treeShaking: true,
  sourcemap: false,
  minify: false,
};

const start = async (): Promise<void> => {
  rimraf.sync(DIST_DIR);

  await build({
    ...baseOptions,
    splitting: true,
    format: 'esm',
    outdir: `${DIST_DIR}/esm`,
    plugins: [dTSPathAliasPlugin({ outputPath: `${DIST_DIR}/typings`, debug: true })],
  });

  await build({
    ...baseOptions,
    format: 'cjs',
    outdir: `${DIST_DIR}/cjs`,
  });
};

start();
