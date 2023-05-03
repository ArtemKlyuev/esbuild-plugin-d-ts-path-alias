import { BuildOptions } from 'esbuild';

import { isObject } from '../isObject';

const isStringArray = (value: any): value is string[] => typeof value[0] === 'string';

export const getDtsEntryPoints = (entryPoints: BuildOptions['entryPoints']): string[] => {
  if (!entryPoints) {
    throw new Error('No entry points');
  }

  if (isObject<Record<string, string>>(entryPoints)) {
    return Object.values(entryPoints);
  }

  if (isStringArray(entryPoints)) {
    return entryPoints;
  }

  return entryPoints.map(({ in: entryPoint }) => entryPoint);
};
