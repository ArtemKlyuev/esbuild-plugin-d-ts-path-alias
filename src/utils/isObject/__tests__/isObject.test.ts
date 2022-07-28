import { isObject } from '../isObject';

describe('utils', () => {
  describe('isObject', () => {
    it('should return `true` if argument is object', () => {
      expect(isObject({})).toBe(true);
    });

    it('should return `false` if argument is array', () => {
      expect(isObject([])).toBe(false);
    });

    it('should return `false` if argument is null', () => {
      expect(isObject(null)).toBe(false);
    });
  });
});
