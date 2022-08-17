import { build, BuildOptions } from 'esbuild';

import { dTSPathAliasPlugin } from './src/plugin';

import { devDependencies, peerDependencies } from './package.json';

const EXTERNAL_PACKAGES = Object.keys({ ...devDependencies, ...peerDependencies });

const baseOptions: BuildOptions = {
  target: 'es2019',
  external: EXTERNAL_PACKAGES,
  platform: 'node',
  entryPoints: ['./src/index.ts'],
  bundle: true,
  treeShaking: true,
  sourcemap: false,
  minify: false,
  plugins: [dTSPathAliasPlugin({ outputPath: 'dist/typings' })],
};

const start = async (): Promise<void> => {
  await build({
    ...baseOptions,
    splitting: true,
    format: 'esm',
    outdir: 'dist/esm',
  });

  await build({
    ...baseOptions,
    format: 'cjs',
    outdir: 'dist/cjs',
  });
};

start();
