import tsconfig from '../__fixtures__/tsconfig.test.json';
import { readConfigFile } from '../readConfigFile';

describe('ts-utils', () => {
  describe('readConfigFile', () => {
    it('should read config file', () => {
      const config = readConfigFile('src/ts-utils/readConfigFile/__fixtures__/tsconfig.test.json');

      expect(config).toEqual({ config: tsconfig, error: undefined });
    });

    it("should throw an error when can't read the config file", () => {
      const config = readConfigFile('non-exist');

      expect(config.config).toEqual({});
      expect(config.error).not.toBeUndefined();
    });
  });
});
