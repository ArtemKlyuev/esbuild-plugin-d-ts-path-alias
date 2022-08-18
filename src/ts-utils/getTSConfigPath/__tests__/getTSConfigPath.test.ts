import path from 'path';

import { getTSConfigPath } from '../getTSConfigPath';

describe('ts-utils', () => {
  describe('getTSConfigPath', () => {
    it('should return tsconfig path', () => {
      const searchPath = path.resolve(__dirname, '../__fixtures__/tsconfig.fixture.json');
      const tsconfigPath = getTSConfigPath(searchPath);

      expect(tsconfigPath).toBe(searchPath);
    });

    it('should return undefined if the path to the config is not found', () => {
      const tsconfigPath = getTSConfigPath('./non-exist/tsconfig.test.json');

      expect(tsconfigPath).toBe(undefined);
    });
  });
});
