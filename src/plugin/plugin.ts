import path from 'path';

import { Plugin } from 'esbuild';
import * as ts from 'typescript';

import { compileDts, getCompilerOptions } from '../ts-utils';
import { Logger, getDeclarationDir, getESBuildOutDir, isObject } from '../utils';

export interface PluginOptions {
  /**
   * Custom path to `tsconfig.json`
   */
  tsconfigPath?: string;
  /**
   * Custom path to output declaration files
   */
  outputPath?: string;
  /**
   * Should plugin output debug logs
   */
  debug?: boolean;
}

const PLUGIN_NAME = 'esbuild-plugin-d-ts-path-alias';

const DEFAULT_TSCONFIG_LOCATION = path.resolve(process.cwd(), 'tsconfig.json');

export const dTSPathAliasPlugin = (pluginOptions?: PluginOptions): Plugin => {
  const logger = new Logger(PLUGIN_NAME, !pluginOptions?.debug);

  return {
    name: PLUGIN_NAME,
    setup(build) {
      const { entryPoints, outdir, outfile, tsconfig } = build.initialOptions;

      const esbuildOutDir = getESBuildOutDir({ outdir, outfile });

      const tsconfigPath = pluginOptions?.tsconfigPath ?? tsconfig ?? DEFAULT_TSCONFIG_LOCATION;

      const compilerOptions = getCompilerOptions(tsconfigPath);

      const declarationDir = getDeclarationDir({
        esbuildOutDir,
        pluginOutputPath: pluginOptions?.outputPath,
        tsconfigDeclarationDir: compilerOptions.declarationDir,
        tsconfigOutDir: compilerOptions.outDir,
      });

      const finalEntryPoints = isObject(entryPoints) ? Object.values(entryPoints) : entryPoints;

      const finalCompilerOptions: ts.CompilerOptions = {
        ...compilerOptions,
        declaration: true,
        emitDeclarationOnly: true,
        declarationDir,
      };

      build.onEnd(() => {
        const emitResult = compileDts(finalEntryPoints!, finalCompilerOptions);

        if (emitResult.emitSkipped) {
          logger.error('Typescript did not emit declaration files!');
          return;
        }

        logger.info('Successfully emitted declaration files!');
      });
    },
  };
};