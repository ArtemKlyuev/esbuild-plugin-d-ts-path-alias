import * as ts from 'typescript';

import { getConfigPath } from '../getConfigPath';

/**
 * Return path to tsconfig or undefined if it does not exist
 */
export const getTSConfigPath = (configPath: string): string | undefined => {
  const { searchPath, configName } = getConfigPath(configPath);

  return ts.findConfigFile(searchPath, ts.sys.fileExists, configName);
};
