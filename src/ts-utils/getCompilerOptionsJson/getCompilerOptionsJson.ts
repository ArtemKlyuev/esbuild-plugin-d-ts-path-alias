import path from 'node:path';

import * as ts from 'typescript';
import findNodeNodules from 'find-node-modules';

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

  const nodeModulesPath = getTSConfigPath(path.resolve(findNodeNodules()[0], configPath));

  if (!tsconfigPath && !nodeModulesPath) {
    console.log({
      configPath,
      kek: findNodeNodules(),
      pr: process.cwd(),
      resolved: path.resolve(findNodeNodules()[0], configPath),
      kek2: findNodeNodules({ cwd: './someDir' }),
      kek3: findNodeNodules({ relative: false }),
    });
    throw new Error(
      `Can't find typescript config file.\nSearched path: "${configPath}"\nnode_modules path: ${nodeModulesPath}`,
    );
  }

  const finalTsConfigPath = tsconfigPath ?? nodeModulesPath;

  const tsconfig = readConfigFile(finalTsConfigPath!);

  if (tsconfig.error) {
    throw new Error(ts.formatDiagnostic(tsconfig.error, formatHost));
  }

  const result: ts.CompilerOptions[] = [tsconfig.config.compilerOptions];

  if (tsconfig.config.extends) {
    const { searchPath } = getConfigPath(configPath);

    console.log('extends____', { searchPath });

    const options = getCompilerOptionsJson(path.join(searchPath, tsconfig.config.extends));

    result.push(options);
  }

  return result.reduceRight((accum, compilerOptions) => ({ ...accum, ...compilerOptions }), {});
};
