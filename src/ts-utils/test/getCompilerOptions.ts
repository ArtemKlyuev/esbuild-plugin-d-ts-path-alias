import * as ts from 'typescript';
import { getTsconfig } from 'get-tsconfig';

import { getConfigPath } from '../getConfigPath';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

export const getCompilerOptions2 = (tsconfigPath: string): ts.CompilerOptions | never => {
  const result = getTsconfig(tsconfigPath);

  if (!result) {
    throw new Error('No result');
  }

  const compilerOptionsUnconverted = result.config.compilerOptions;

  if (!compilerOptionsUnconverted) {
    throw new Error('No compiler options');
  }

  const a = getConfigPath(tsconfigPath);

  console.log('tsconfigPath', a);

  const convertResult = ts.convertCompilerOptionsFromJson(compilerOptionsUnconverted, a.searchPath);

  if (convertResult?.errors.length > 0) {
    throw new Error(ts.formatDiagnostics(convertResult.errors, formatHost));
  }

  console.log('new compiler options', convertResult.options);

  return convertResult.options;
};
