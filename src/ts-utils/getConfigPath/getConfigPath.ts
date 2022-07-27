import path from 'path';

export const getConfigPath = (configPath: string) => {
  let finalPath = configPath;

  // if (!path.isAbsolute(configPath)) {
  //   finalPath = path.resolve(process.cwd(), configPath);
  // }

  const splittedPath = finalPath.split(path.sep);
  const configName = splittedPath.pop();
  const searchPath = splittedPath.join(path.sep);

  return { searchPath, configName };
};
