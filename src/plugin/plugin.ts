import path from 'path';

import { Plugin } from 'esbuild';
import * as ts from 'typescript';
// import { getTsconfig } from 'get-tsconfig';

import { compileDts, getCompilerOptions, getConfigPath } from '../ts-utils';

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

      logger.info(`Used tsconfig: ${path.resolve(process.cwd(), tsconfigPath)}`);

      console.log('tsconfigPath--->', tsconfigPath);

      const compilerOptions = getCompilerOptions(tsconfigPath);

      // const result = getTsconfig(tsconfigPath);

      // if (!result) {
      //   throw new Error('No result');
      // }

      // // const {
      // //   config: { compilerOptions },
      // // } = result;
      // const compilerOptionsUnconverted = result.config.compilerOptions;

      // if (!compilerOptionsUnconverted) {
      //   throw new Error('No compiler options');
      // }

      // const a = getConfigPath(tsconfigPath);

      // console.log('tsconfigPath', a);

      // const compilerOptions = ts.convertCompilerOptionsFromJson(
      //   compilerOptionsUnconverted,
      //   a.searchPath,
      // ).options;
      // // console.log('tsconfigPath', tsconfigPath);
      // console.log('old compiler options', compilerOptionsOld);

      // console.log('new compiler options', compilerOptions);

      // const compilerOptions = getCompilerOptions2(tsconfigPath);

      const declarationDir = getDeclarationDir({
        esbuildOutDir,
        pluginOutputPath: pluginOptions?.outputPath,
        tsconfigDeclarationDir: compilerOptions.declarationDir,
        tsconfigOutDir: compilerOptions.outDir,
      });

      logger.info(
        `Declaration files output directory: ${path.resolve(process.cwd(), declarationDir)}`,
      );

      const finalEntryPoints = isObject(entryPoints) ? Object.values(entryPoints) : entryPoints;

      const finalCompilerOptions: ts.CompilerOptions = {
        ...compilerOptions,
        noEmit: false,
        declaration: true,
        emitDeclarationOnly: true,
        declarationDir,
      };

      build.onEnd(() => {
        const emitResult = compileDts(finalEntryPoints!, finalCompilerOptions);

        if (emitResult.emitSkipped) {
          logger.error('Typescript did not emit declaration files! Additional info:\n', {
            entryPoints: finalEntryPoints,
            initialCompilerOptions: compilerOptions,
            finalCompilerOptions,
            emitResult,
          });

          return;
        }

        logger.success('Successfully emitted declaration files!');
      });
    },
  };
};
