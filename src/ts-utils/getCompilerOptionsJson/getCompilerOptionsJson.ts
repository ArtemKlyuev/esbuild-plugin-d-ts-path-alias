import path from 'path';

import * as ts from 'typescript';

import { getConfigPath } from '../getConfigPath';
import { getTSConfigPath } from '../getTSConfigPath';
import { readConfigFile } from '../readConfigFile';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path: string) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

export const getCompilerOptionsJson = (configPath: string): ts.CompilerOptions | never => {
  const tsConfigPath = getTSConfigPath(configPath);

  if (!tsConfigPath) {
    throw new Error(`Can't find typescript config file. Searched path: "${configPath}"`);
  }

  const tsConfig = readConfigFile(tsConfigPath);

  if (tsConfig.error) {
    throw new Error(ts.formatDiagnostic(tsConfig.error, formatHost));
  }

  const result: ts.CompilerOptions[] = [tsConfig.config.compilerOptions];

  if (tsConfig.config.extends) {
    const { searchPath } = getConfigPath(configPath);

    const options = getCompilerOptionsJson(path.join(searchPath, tsConfig.config.extends));

    result.push(options);
  }

  return result.reduceRight((accum, compilerOptions) => ({ ...accum, ...compilerOptions }), {});
};
