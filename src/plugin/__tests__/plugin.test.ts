import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import { build, BuildOptions } from 'esbuild';

import { PluginOptions, dTSPathAliasPlugin } from '../plugin';

interface Args {
  esbuildOptions?: BuildOptions;
  pluginOptions?: PluginOptions;
}

const TEMP_FOLDER_BASE = path.join(process.cwd(), 'temp');

const createTempDirPath = (): string => {
  const [randomID] = crypto.randomUUID().split('-');
  return path.join(TEMP_FOLDER_BASE, randomID);
};

const setup = () => {
  const buildDir = createTempDirPath();

  const builder = ({ esbuildOptions, pluginOptions }: Args = {}) => {
    return build({
      entryPoints: [path.resolve(__dirname, '../__fixtures__/index.ts')],
      absWorkingDir: path.resolve(__dirname, '../__fixtures__'),
      outdir: buildDir,
      bundle: true,
      write: false,
      plugins: [
        dTSPathAliasPlugin({
          tsconfigPath: path.resolve(__dirname, '../__fixtures__/tsconfig.json'),
          ...pluginOptions,
        }),
      ],
      ...esbuildOptions,
    });
  };

  const cleanup = () => fs.rm(buildDir, { recursive: true, force: true });
  const readFile = (filePath: string) => fs.readFile(path.resolve(buildDir, filePath), 'utf-8');

  return { buildDir, builder, cleanup, readFile };
};

describe('plugin', () => {
  it('should apply alias transform to declaration files', async () => {
    const { builder, cleanup, readFile } = setup();

    await builder();

    const buildResult = await readFile('someFunc.d.ts');

    expect(buildResult).not.toContain('@utils/foo');
    expect(buildResult).toContain('./utils/foo');

    await cleanup();
  });

  it('should remove non type imports from declaration files', async () => {
    const { builder, cleanup, readFile } = setup();

    await builder();

    const buildResult = await readFile('index.d.ts');

    expect(buildResult).not.toContain('import "./index.css"');
    expect(buildResult.trim()).toBe("export * from './someFunc';");

    cleanup();
  });

  it('should emit declaration files if no `outdir` and `outfile` option was provided', async () => {
    const { buildDir, builder, cleanup, readFile } = setup();

    await fs.mkdir(path.resolve(process.cwd(), buildDir), { recursive: true });

    await builder({
      esbuildOptions: {
        entryPoints: [path.resolve(__dirname, '../__fixtures__/index2.ts')],
        outdir: undefined,
        outfile: undefined,
      },
      pluginOptions: { outputPath: buildDir },
    });

    const buildResult = await Promise.all([
      readFile('index2.d.ts'),
      readFile('someFunc.d.ts'),
      readFile('utils/foo.d.ts'),
    ]);

    buildResult.forEach((file) => {
      expect(file.length).toBeGreaterThan(0);
    });

    cleanup();
  });

  it('should emit declaration files if `entryPoints` is array of strings', async () => {
    const { builder, cleanup, readFile } = setup();

    await builder({
      esbuildOptions: {
        entryPoints: [path.resolve(__dirname, '../__fixtures__/index.ts')],
      },
    });

    const buildResult = await Promise.all([
      readFile('index.d.ts'),
      readFile('someFunc.d.ts'),
      readFile('utils/foo.d.ts'),
    ]);

    buildResult.forEach((file) => {
      expect(file.length).toBeGreaterThan(0);
    });

    cleanup();
  });

  it('should emit declaration files if `entryPoints` is record object', async () => {
    const { builder, cleanup, readFile } = setup();

    await builder({
      esbuildOptions: {
        entryPoints: { index: path.resolve(__dirname, '../__fixtures__/index.ts') },
      },
    });

    const buildResult = await Promise.all([
      readFile('index.d.ts'),
      readFile('someFunc.d.ts'),
      readFile('utils/foo.d.ts'),
    ]);

    buildResult.forEach((file) => {
      expect(file.length).toBeGreaterThan(0);
    });

    cleanup();
  });

  it('should emit declaration files if `entryPoints` is array of objects', async () => {
    const { builder, cleanup, readFile } = setup();

    await builder({
      esbuildOptions: {
        entryPoints: [{ out: 'out1', in: path.resolve(__dirname, '../__fixtures__/index.ts') }],
      },
    });

    const buildResult = await Promise.all([
      readFile('index.d.ts'),
      readFile('someFunc.d.ts'),
      readFile('utils/foo.d.ts'),
    ]);

    buildResult.forEach((file) => {
      expect(file.length).toBeGreaterThan(0);
    });

    cleanup();
  });
});
