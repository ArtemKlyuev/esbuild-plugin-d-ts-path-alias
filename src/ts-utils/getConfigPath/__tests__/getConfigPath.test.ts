import { getConfigPath } from '../getConfigPath';

describe('ts-utils', () => {
  describe('getConfigPath', () => {
    it('should return empty `searchPath` and `configName`', () => {
      const config = 'tsconfig.json';

      const { searchPath, configName } = getConfigPath(config);

      expect(searchPath).toBe('');
      expect(configName).toBe(config);
    });

    it('should return dot for `searchPath` and `configName`', () => {
      const path = './';
      const config = 'tsconfig.json';

      const { searchPath, configName } = getConfigPath(`${path}${config}`);

      expect(searchPath).toBe('.');
      expect(configName).toBe(config);
    });

    it('should return path for `searchPath` and `configName`', () => {
      const path = './foo';
      const config = 'tsconfig.json';

      const { searchPath, configName } = getConfigPath(`${path}/${config}`);

      expect(searchPath).toBe(path);
      expect(configName).toBe(config);
    });
  });
});
