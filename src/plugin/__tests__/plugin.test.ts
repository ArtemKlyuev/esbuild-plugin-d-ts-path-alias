import fs from 'fs/promises';
import path from 'path';

import { build, BuildOptions } from 'esbuild';
import tmp from 'tmp';

import { PluginOptions, dTSPathAliasPlugin } from '../plugin';

interface Args {
  esbuildOptions?: BuildOptions;
  pluginOptions?: PluginOptions;
}

const builder = async ({ esbuildOptions, pluginOptions }: Args): Promise<void> => {
  await build({
    entryPoints: [path.resolve(__dirname, '../__fixtures__/index.ts')],
    absWorkingDir: path.resolve(__dirname, '../__fixtures__'),
    bundle: true,
    plugins: [dTSPathAliasPlugin(pluginOptions)],
    ...esbuildOptions,
  });
};

describe('plugin', () => {
  it('should apply alias transform to declaration files', async () => {
    const buildDir = tmp.dirSync();

    await builder({
      esbuildOptions: { outdir: buildDir.name },
      pluginOptions: { tsconfigPath: path.resolve(__dirname, '../__fixtures__/tsconfig.json') },
    });

    const buildResult = await fs.readFile(`${buildDir.name}/someFunc.d.ts`, 'utf-8');

    expect(buildResult).not.toContain('@utils/foo');
    expect(buildResult).toContain('./utils/foo');

    fs.rm(buildDir.name, { recursive: true });
  });

  it('should remove non type imports from declaration files', async () => {
    const buildDir = tmp.dirSync();

    await builder({
      esbuildOptions: { outdir: buildDir.name },
      pluginOptions: { tsconfigPath: path.resolve(__dirname, '../__fixtures__/tsconfig.json') },
    });

    const buildResult = await fs.readFile(`${buildDir.name}/index.d.ts`, 'utf-8');

    expect(buildResult).not.toContain('import "./index.css"');

    fs.rm(buildDir.name, { recursive: true });
  });
});
