import ts from 'typescript';

import { getCompilerOptionsJson } from '../getCompilerOptionsJson';
import { getConfigPath } from '../getConfigPath';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

export const getCompilerOptions = (configPath: string): ts.CompilerOptions | never => {
  const jsonConfig = getCompilerOptionsJson(configPath);

  const { searchPath } = getConfigPath(configPath);

  const convertResult = ts.convertCompilerOptionsFromJson(jsonConfig, searchPath);

  if (convertResult?.errors.length > 0) {
    throw new Error(ts.formatDiagnostics(convertResult.errors, formatHost));
  }

  return convertResult.options;
};
