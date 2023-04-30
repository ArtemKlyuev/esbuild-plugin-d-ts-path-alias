import path from 'path';

import * as ts from 'typescript';

import { getConfigPath } from '../getConfigPath';
import { getTSConfigPath } from '../getTSConfigPath';
import { readConfigFile } from '../readConfigFile';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (filePath) => filePath,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

export const getCompilerOptionsJson = (configPath: string): ts.CompilerOptions | never => {
  const tsconfigPath = getTSConfigPath(configPath);

  if (!tsconfigPath) {
    throw new Error(`Can't find typescript config file. Searched path: "${configPath}"`);
  }

  const tsconfig = readConfigFile(tsconfigPath);

  if (tsconfig.error) {
    throw new Error(ts.formatDiagnostic(tsconfig.error, formatHost));
  }

  const result: ts.CompilerOptions[] = [tsconfig.config.compilerOptions];

  if (tsconfig.config.extends) {
    const { searchPath } = getConfigPath(configPath);

    const extendedConfig = Array.isArray(tsconfig.config.extends)
      ? tsconfig.config.extends[0]
      : tsconfig.config.extends;

    const options = getCompilerOptionsJson(path.join(searchPath, extendedConfig));

    result.push(options);
  }

  return result.reduceRight((accum, compilerOptions) => ({ ...accum, ...compilerOptions }), {});
};
