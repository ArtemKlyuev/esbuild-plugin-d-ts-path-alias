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

const builder = ({ esbuildOptions, pluginOptions }: Args) => {
  return build({
    entryPoints: [path.resolve(__dirname, '../__fixtures__/index.ts')],
    absWorkingDir: path.resolve(__dirname, '../__fixtures__'),
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

const setup = async () => {
  const buildDir = createTempDirPath();

  await builder({ esbuildOptions: { outdir: buildDir } });

  const cleanup = () => fs.rm(buildDir, { recursive: true });
  const readFile = (filePath: string) => fs.readFile(path.resolve(buildDir, filePath), 'utf-8');

  return { cleanup, readFile };
};

describe('plugin', () => {
  it('should apply alias transform to declaration files', async () => {
    const { cleanup, readFile } = await setup();

    const buildResult = await readFile('someFunc.d.ts');

    expect(buildResult).not.toContain('@utils/foo');
    expect(buildResult).toContain('./utils/foo');

    await cleanup();
  });

  it('should remove non type imports from declaration files', async () => {
    const { cleanup, readFile } = await setup();

    const buildResult = await readFile('index.d.ts');

    expect(buildResult).not.toContain('import "./index.css"');
    expect(buildResult.trim()).toBe("export * from './someFunc';");

    cleanup();
  });
});
