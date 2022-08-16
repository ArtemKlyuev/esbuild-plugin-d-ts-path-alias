import { readConfigFileMock } from '../../readConfigFile/__mocks__';

import { getCompilerOptionsJson } from '../getCompilerOptionsJson';

describe('ts-utils', () => {
  describe('getCompilerOptionsJson', () => {
    it('should throw an error if no tsconfig finded', () => {
      const searchPath = './non-exist/tsconfig.test.json';

      expect(() => getCompilerOptionsJson(searchPath)).toThrowError();
      expect(() => getCompilerOptionsJson(searchPath)).toThrowError(
        `Can't find typescript config file. Searched path: "${searchPath}"`,
      );
    });

    it("should throw an error if can't read tsconfig file", () => {
      // @ts-expect-error we don't need actual implementation, just `error` property itself
      readConfigFileMock.mockReturnValueOnce({ error: true });

      expect(() => getCompilerOptionsJson('./example/tsconfig.json')).toThrowError();
    });

    // TODO: write other tests
  });
});
