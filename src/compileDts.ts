import * as ts from 'typescript';
import tsTransformPaths from '@zerollup/ts-transform-paths';

import { transform } from './transform';

/**
 * @see https://habr.com/ru/post/508484/
 */

/**
 * {@link https://github.com/zerkalica/zerollup/issues/37}
 * {@link https://github.com/zerkalica/zerollup/pull/38}
 */

const formatHost = {
  getCanonicalFileName: (path: string) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

const getCompilerOptionsJson = (searchPath: string, configName?: string): ts.CompilerOptions => {
  const configPath = ts.findConfigFile(searchPath, ts.sys.fileExists, configName);
  const readConfigFileResult = ts.readConfigFile(configPath!, ts.sys.readFile);
  const res: ts.CompilerOptions[] = [];

  if (readConfigFileResult.error) {
    throw new Error(ts.formatDiagnostic(readConfigFileResult.error, formatHost));
  }

  res.push(readConfigFileResult.config.compilerOptions);

  if (readConfigFileResult.config.extends) {
    const options = getCompilerOptionsJson(searchPath, readConfigFileResult.config.extends);
    res.push(options);
  }

  return res.reduceRight((accum, compilerOptions) => ({ ...accum, ...compilerOptions }), {});
};

const getCompilerOptions = (): ts.CompilerOptions => {
  const jsonConfig = getCompilerOptionsJson('./', 'tsconfig.json');

  const convertResult = ts.convertCompilerOptionsFromJson(jsonConfig, './');

  if (convertResult.errors && convertResult.errors.length > 0) {
    throw new Error(ts.formatDiagnostics(convertResult.errors, formatHost));
  }

  const compilerOptions = convertResult.options;

  return compilerOptions;
};

const compileDts = (fileNames: string[], options?: ts.CompilerOptions): void => {
  const compilerOptions = getCompilerOptions();
  const finalOptions = { ...compilerOptions, ...options };

  const host = ts.createCompilerHost(finalOptions);
  host.writeFile = (fileName, contents) => {
    ts.sys.writeFile(fileName, contents);
  };

  const program = ts.createProgram(fileNames, finalOptions, host);

  const transformer = tsTransformPaths(program);

  program.emit(undefined, undefined, undefined, undefined, {
    afterDeclarations: [transform(), transformer.afterDeclarations!],
  });
};

compileDts(['./example/src/utils/index.ts'], {
  declaration: true,
  emitDeclarationOnly: true,
  declarationDir: 'dts',
});
