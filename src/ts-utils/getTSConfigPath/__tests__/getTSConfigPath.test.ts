import { getTSConfigPath } from '../getTSConfigPath';

describe('ts-utils', () => {
  describe('getTSConfigPath', () => {
    it('kek', () => {
      const path = getTSConfigPath('./example/tsconfig.json');

      console.log('path', path);
    });
  });
});
