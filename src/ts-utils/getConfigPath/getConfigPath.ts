import path from 'path';

export const getConfigPath = (configPath: string) => {
  const splittedPath = configPath.split(path.sep);
  const configName = splittedPath.pop();
  const searchPath = splittedPath.join(path.sep);

  return { searchPath, configName };
};
