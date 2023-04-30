import ts from 'typescript';

/**
 * @param configPath relative path to tsconfig
 */
export const readConfigFile = (configPath: string) => {
  return ts.readConfigFile(configPath!, ts.sys.readFile);
};
