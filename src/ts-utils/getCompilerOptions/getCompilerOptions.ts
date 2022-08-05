import * as ts from 'typescript';

import { getCompilerOptionsJson } from '../getCompilerOptionsJson';

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path: string) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

export const getCompilerOptions = (configPath: string): ts.CompilerOptions | never => {
  const jsonConfig = getCompilerOptionsJson(configPath);

  const convertResult = ts.convertCompilerOptionsFromJson(jsonConfig, process.cwd());

  if (convertResult?.errors.length > 0) {
    throw new Error(ts.formatDiagnostics(convertResult.errors, formatHost));
  }

  return convertResult.options;
};
